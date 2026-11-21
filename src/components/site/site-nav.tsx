"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { AccentSwatches, ThemeToggle } from "@/components/theme-controls";
import { BrandWordmark } from "@/components/site/brand";
import { MobileMenu } from "@/components/site/mobile-menu";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["top", "about", "works", "skills", "contact"] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [sectionId, setSectionId] = useState<string>("top");
  const [scrolled, setScrolled] = useState(false);

  const activeId = pathname.startsWith("/projects")
    ? "works"
    : pathname !== "/"
      ? ""
      : sectionId;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    let frame = 0;

    const updateActive = () => {
      frame = 0;
      const probe = window.scrollY + window.innerHeight * 0.38;
      let current = "top";

      for (const id of SECTION_IDS) {
        const element = document.getElementById(id);
        if (!element) continue;
        const top = element.getBoundingClientRect().top + window.scrollY;
        if (top <= probe) current = id;
      }

      setSectionId(current);
    };

    const handleScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(updateActive);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-300",
        scrolled
          ? "border-line bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-shell flex h-[4.5rem] items-center justify-between gap-6">
        <Link
          href="/"
          aria-label={`${siteConfig.name} — home`}
          className="group flex shrink-0 items-center text-ink"
        >
          <BrandWordmark className="h-[1.4rem] w-auto transition-opacity duration-300 group-hover:opacity-80" />
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {siteConfig.nav.map((item) => {
            const id = item.href.split("#")[1];
            const isActive = activeId === id;
            return (
              <Link
                key={item.label}
                href={item.href}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "relative py-2 font-mono text-[0.68rem] uppercase tracking-[0.14em] transition-colors",
                  isActive
                    ? "text-ink"
                    : "text-muted-strong hover:text-ink",
                )}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -bottom-0.5 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent transition-transform duration-300",
                    isActive ? "scale-100" : "scale-0",
                  )}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <AccentSwatches />
          <span aria-hidden="true" className="mx-2 h-4 w-px bg-line" />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-0.5 lg:hidden">
          <ThemeToggle />
          <MobileMenu activeId={activeId} />
        </div>
      </div>
    </header>
  );
}
