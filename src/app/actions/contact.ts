"use server";

import { headers } from "next/headers";
import { siteConfig } from "@/data/site";
import type { ContactField, ContactFormState } from "@/lib/contact";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX = 4;
const DUPLICATE_WINDOW_MS = 90 * 1000;

type Bucket = {
  hits: number[];
  last?: { fingerprint: string; at: number };
};

const globalStore = globalThis as typeof globalThis & {
  __emmyContactBuckets?: Map<string, Bucket>;
};

const buckets =
  globalStore.__emmyContactBuckets ??
  (globalStore.__emmyContactBuckets = new Map<string, Bucket>());

function readField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function oneLine(value: string) {
  return value.replace(/[\r\n]+/g, " ");
}

async function getClientKey() {
  const requestHeaders = await headers();
  const forwarded = requestHeaders.get("x-forwarded-for");
  return (
    forwarded?.split(",")[0]?.trim() ||
    requestHeaders.get("x-real-ip") ||
    "local"
  );
}

function fail(message: string, fieldErrors?: ContactFormState["fieldErrors"]): ContactFormState {
  return { status: "error", message, fieldErrors };
}

export async function submitContact(
  _previousState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  const name = oneLine(readField(formData, "name"));
  const email = oneLine(readField(formData, "email"));
  const subject = oneLine(readField(formData, "subject"));
  const message = readField(formData, "message");
  const honeypot = readField(formData, "company");

  if (honeypot) {
    return fail("Your message could not be sent.");
  }

  const fieldErrors: Partial<Record<ContactField, string>> = {};

  if (name.length < 2) {
    fieldErrors.name = "Please enter your name.";
  } else if (name.length > 100) {
    fieldErrors.name = "Please keep your name under 100 characters.";
  }

  if (!EMAIL_PATTERN.test(email)) {
    fieldErrors.email = "Please enter a valid email address.";
  } else if (email.length > 200) {
    fieldErrors.email = "Please enter a shorter email address.";
  }

  if (subject.length < 3) {
    fieldErrors.subject = "Please add a subject.";
  } else if (subject.length > 150) {
    fieldErrors.subject = "Please keep the subject under 150 characters.";
  }

  if (message.length < 10) {
    fieldErrors.message = "Please add a little more detail (at least 10 characters).";
  } else if (message.length > 5000) {
    fieldErrors.message = "Please keep the message under 5000 characters.";
  }

  if (Object.keys(fieldErrors).length > 0) {
    return fail("Please fix the highlighted fields.", fieldErrors);
  }

  const linkCount = (message.match(/https?:\/\/|www\./gi) ?? []).length;
  if (linkCount > 3) {
    return fail(
      `Your message looks like spam. Please email me directly at ${siteConfig.email}.`,
    );
  }

  const clientKey = await getClientKey();
  const now = Date.now();
  const bucket = buckets.get(clientKey) ?? { hits: [] };
  bucket.hits = bucket.hits.filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  const fingerprint = `${email}|${subject}|${message}`;
  if (
    bucket.last &&
    bucket.last.fingerprint === fingerprint &&
    now - bucket.last.at < DUPLICATE_WINDOW_MS
  ) {
    return fail(
      "This message was just sent. Please wait a moment before sending it again.",
    );
  }

  if (bucket.hits.length >= RATE_LIMIT_MAX) {
    return fail(
      `Too many messages in a short time. Please try again later or email me directly at ${siteConfig.email}.`,
    );
  }

  bucket.hits.push(now);
  buckets.set(clientKey, bucket);

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;
  const toEmail = process.env.CONTACT_TO_EMAIL || siteConfig.email;

  if (!apiKey || !fromEmail) {
    return fail(
      `Contact delivery isn't configured yet. Please email me directly at ${siteConfig.email}.`,
    );
  }

  const text = [
    "New message from the EmmyCodes portfolio",
    "",
    `Name: ${name}`,
    `Email: ${email}`,
    `Subject: ${subject}`,
    "",
    "Message:",
    message,
    "",
    `Sent: ${new Date().toISOString()}`,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      cache: "no-store",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: email,
        subject: `Portfolio enquiry — ${subject}`,
        text,
      }),
      signal: AbortSignal.timeout(10000),
    });

    if (!response.ok) {
      console.error(`Contact delivery failed with status ${response.status}.`);
      return fail(
        `The message couldn't be sent right now. Please try again or email me directly at ${siteConfig.email}.`,
      );
    }
  } catch {
    console.error("Contact delivery request failed.");
    return fail(
      `The message couldn't be sent right now. Please try again or email me directly at ${siteConfig.email}.`,
    );
  }

  bucket.last = { fingerprint, at: now };
  buckets.set(clientKey, bucket);

  return {
    status: "success",
    message: "Thanks — your message has been sent. I'll get back to you soon.",
  };
}
