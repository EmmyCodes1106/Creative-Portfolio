"use client";

import { useActionState, useEffect, useRef } from "react";
import { ArrowRight, LoaderCircle, Mail } from "lucide-react";
import { submitContact } from "@/app/actions/contact";
import { siteConfig } from "@/data/site";
import {
  initialContactState,
  type ContactField,
  type ContactFormState,
} from "@/lib/contact";
import { cn } from "@/lib/utils";

type FieldProps = {
  name: ContactField;
  label: string;
  type?: "text" | "email";
  autoComplete?: string;
  placeholder?: string;
  error?: string;
  textarea?: boolean;
  className?: string;
};

function Field({
  name,
  label,
  type = "text",
  autoComplete,
  placeholder,
  error,
  textarea = false,
  className,
}: FieldProps) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    required: true,
    placeholder,
    autoComplete,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: "field mt-2",
  } as const;

  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-strong"
      >
        {label} <span className="text-accent-ink">*</span>
      </label>

      {textarea ? (
        <textarea {...shared} rows={5} minLength={10} maxLength={5000} />
      ) : (
        <input
          {...shared}
          type={type}
          minLength={name === "name" ? 2 : name === "subject" ? 3 : undefined}
          maxLength={name === "email" ? 200 : name === "name" ? 100 : 150}
        />
      )}

      {error ? (
        <p id={errorId} className="mt-1.5 text-xs text-danger">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({ configured }: { configured: boolean }) {
  const [state, formAction, pending] = useActionState<
    ContactFormState,
    FormData
  >(submitContact, initialContactState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === "success") {
      formRef.current?.reset();
    }
  }, [state.status]);

  useEffect(() => {
    if (state.status !== "error" || !state.fieldErrors) return;
    const firstField = Object.keys(state.fieldErrors)[0];
    if (!firstField) return;
    document.getElementById(`contact-${firstField}`)?.focus();
  }, [state]);

  const errors = state.fieldErrors ?? {};

  if (!configured) {
    return (
      <div className="border border-line bg-surface p-6 sm:p-8">
        <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <h3 className="font-display text-title font-medium text-ink">
              Send a message
            </h3>
            <p className="mt-1 text-xs text-muted">Goes straight to my inbox.</p>
          </div>
          <span className="mono-label text-[0.55rem]">04.1</span>
        </div>

        <p className="mt-6 text-sm leading-relaxed text-muted-strong">
          Tell me a little about the project or role you have in mind and
          I&apos;ll reply by email.
        </p>

        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("Portfolio enquiry")}`}
          className="btn btn-solid mt-6 w-full"
        >
          <Mail className="size-4" strokeWidth={1.6} aria-hidden="true" />
          {siteConfig.email}
        </a>

        <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
          Opens your email app with the subject filled in.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      action={formAction}
      className="border border-line bg-surface p-6 sm:p-8"
    >
      <div className="flex items-start justify-between gap-4 border-b border-line pb-5">
        <div>
          <h3 className="font-display text-title font-medium text-ink">
            Send a message
          </h3>
          <p className="mt-1 text-xs text-muted">Fields marked * are required.</p>
        </div>
        <span className="mono-label text-[0.55rem]">04.1</span>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <Field
          name="name"
          label="Name"
          autoComplete="name"
          placeholder="Your name"
          error={errors.name}
        />
        <Field
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email}
        />
      </div>

      <Field
        name="subject"
        label="Subject"
        autoComplete="off"
        placeholder="What is this about?"
        error={errors.subject}
        className="mt-4"
      />
      <Field
        name="message"
        label="Message"
        placeholder="Tell me about the idea, role or project…"
        error={errors.message}
        textarea
        className="mt-4"
      />

      <div
        aria-hidden="true"
        className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden"
      >
        <label htmlFor="contact-company">Company</label>
        <input
          id="contact-company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div aria-live="polite" aria-atomic="true" className="mt-4">
        {state.status !== "idle" && state.message ? (
          <p
            role={state.status === "error" ? "alert" : "status"}
            className={cn(
              "flex items-start gap-2 border px-3 py-2.5 text-sm",
              state.status === "success"
                ? "border-accent/40 bg-accent-soft text-ink"
                : "border-danger/40 text-danger",
            )}
          >
            {state.message}
          </p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={pending}
        aria-busy={pending}
        className="btn btn-solid mt-4 w-full disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? (
          <>
            <LoaderCircle
              className="size-4 animate-spin"
              strokeWidth={1.6}
              aria-hidden="true"
            />
            Sending…
          </>
        ) : (
          <>
            Send message
            <ArrowRight
              className="size-4"
              strokeWidth={1.6}
              aria-hidden="true"
            />
          </>
        )}
      </button>

      <p className="mt-3 text-[0.7rem] leading-relaxed text-muted">
        Your details are only used to reply to this message.
      </p>
    </form>
  );
}
