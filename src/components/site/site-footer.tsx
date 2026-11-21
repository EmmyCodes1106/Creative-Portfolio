import Link from "next/link";
import { ArrowUp, ArrowUpRight, Mail } from "lucide-react";
import { siteConfig } from "@/data/site";
import { BrandWordmark } from "@/components/site/brand";
import { getCurrentYear } from "@/lib/year";

export async function SiteFooter() {
  const year = await getCurrentYear();

  return (
    <footer className="section-rule">
      <div className="container-shell py-14 md:py-16">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex text-ink">
              <BrandWordmark className="h-7 w-auto" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-strong">
              {siteConfig.headline}
            </p>
            <p className="mono-label mt-8">Portfolio — {year}</p>
          </div>

          <nav aria-label="Footer" className="md:col-span-3">
            <p className="mono-label">Navigate</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.nav.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted-strong transition-colors hover:text-ink"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-4">
            <p className="mono-label">Elsewhere</p>
            <ul className="mt-4 space-y-2.5">
              {siteConfig.socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between gap-4 border-b border-line pb-2.5 text-sm transition-colors hover:text-accent-ink"
                  >
                    <span>{social.label}</span>
                    <span className="flex items-center gap-2 font-mono text-[0.65rem] uppercase tracking-[0.1em] text-muted">
                      {social.handle}
                      <ArrowUpRight
                        className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={`mailto:${siteConfig.email}`}
              className="link-arrow mt-5 text-sm"
            >
              <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[0.63rem] uppercase tracking-[0.12em] text-muted">
            © {year} EmmyCodes. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <p className="text-xs text-muted">
              Designed &amp; built by Fadayomi Emmanuel
            </p>
            <Link
              href="/#top"
              className="link-arrow font-mono text-[0.63rem] uppercase tracking-[0.12em] text-muted-strong"
            >
              Back to top
              <ArrowUp className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
