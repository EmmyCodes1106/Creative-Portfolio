"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Mail, Menu, X } from "lucide-react";
import { siteConfig } from "@/data/site";
import { AccentSwatches, ThemeToggle } from "@/components/theme-controls";
import { cn } from "@/lib/utils";

export function MobileMenu({ activeId }: { activeId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  const openMenu = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    setOpen(true);
    dialog.showModal();
  };

  const closeMenu = () => {
    dialogRef.current?.close();
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClose = () => {
      setOpen(false);
      document.body.style.overflow = "";
      triggerRef.current?.focus();
    };

    dialog.addEventListener("close", handleClose);
    return () => dialog.removeEventListener("close", handleClose);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 1024px)");
    const handleChange = () => {
      if (media.matches) closeMenu();
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={openMenu}
        aria-label="Open menu"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-10 place-items-center text-ink lg:hidden"
      >
        <Menu className="size-5" strokeWidth={1.6} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        id="mobile-menu"
        className="mobile-menu lg:hidden"
        aria-labelledby="mobile-menu-title"
      >
        <div className="container-shell flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line">
          <span
            id="mobile-menu-title"
            className="font-mono text-[0.7rem] uppercase tracking-[0.18em] text-muted-strong"
          >
            Menu
          </span>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="grid size-10 place-items-center text-ink"
          >
            <X className="size-5" strokeWidth={1.6} aria-hidden="true" />
          </button>
        </div>

        <div className="container-shell flex flex-1 flex-col justify-between gap-10 overflow-y-auto py-8">
          <nav aria-label="Mobile navigation">
            <ul>
              {siteConfig.nav.map((item, index) => {
                const isActive = activeId === item.href.split("#")[1];
                return (
                  <li key={item.label} className="border-b border-line">
                    <Link
                      href={item.href}
                      onClick={closeMenu}
                      aria-current={isActive ? "location" : undefined}
                      className="group flex items-center justify-between gap-4 py-5"
                    >
                      <span className="flex items-baseline gap-4">
                        <span className="font-mono text-[0.65rem] tracking-[0.14em] text-muted">
                          0{index + 1}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[2rem] leading-none tracking-[-0.03em]",
                            isActive ? "text-accent-ink" : "text-ink",
                          )}
                        >
                          {item.label}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="size-4 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="space-y-6">
            <div>
              <p className="mono-label">Appearance</p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-strong">Theme</span>
                  <span className="grid size-9 place-items-center rounded-full border border-line">
                    <ThemeToggle />
                  </span>
                </div>
                <AccentSwatches />
              </div>
            </div>

            <div className="border-t border-line pt-5">
              <a
                href={`mailto:${siteConfig.email}`}
                className="link-arrow font-display text-lg tracking-tight"
              >
                <Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />
                {siteConfig.email}
              </a>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                {siteConfig.socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-arrow font-mono text-[0.68rem] uppercase tracking-[0.14em] text-muted-strong hover:text-accent-ink"
                    >
                      {social.label}
                      <ArrowUpRight
                        className="size-3.5"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </dialog>
    </>
  );
}
