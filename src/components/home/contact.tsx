import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal } from "@/components/animation/reveal";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/data/site";

export function Contact() {
  const deliveryConfigured = Boolean(
    process.env.RESEND_API_KEY && process.env.CONTACT_FROM_EMAIL,
  );

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="section section-rule"
    >
      <div className="container-shell">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-6">
            <Reveal>
              <p className="mono-label">04 / Contact</p>
              <h2
                id="contact-title"
                className="mt-4 max-w-xl font-display text-display font-medium text-ink"
              >
                Have an idea? Let&apos;s build something meaningful.
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-strong sm:text-base">
                {deliveryConfigured
                  ? "Tell me a little about the project or role you have in mind. Use the form, or reach me directly by email."
                  : "Tell me a little about the project or role you have in mind — email is the fastest way to reach me."}
              </p>

              <div className="mt-9">
                <p className="mono-label">Email</p>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="mt-2 inline-flex items-center gap-3 font-display text-[clamp(1.25rem,2.6vw,1.9rem)] tracking-[-0.02em] text-ink underline decoration-line-strong decoration-1 underline-offset-[7px] transition-colors hover:text-accent-ink hover:decoration-accent"
                >
                  <Mail
                    className="size-5 shrink-0"
                    strokeWidth={1.4}
                    aria-hidden="true"
                  />
                  {siteConfig.email}
                </a>
              </div>

              <ul className="mt-10 border-t border-line">
                {siteConfig.socials.map((social) => (
                  <li key={social.label} className="border-b border-line">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between gap-4 py-4"
                    >
                      <span className="font-display text-lg tracking-[-0.02em] text-ink transition-colors group-hover:text-accent-ink">
                        {social.label}
                      </span>
                      <span className="flex items-center gap-3 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
                        {social.handle}
                        <ArrowUpRight
                          className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <div className="lg:col-span-6">
            <Reveal delay={0.1}>
              <ContactForm configured={deliveryConfigured} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
