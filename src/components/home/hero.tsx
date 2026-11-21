"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLoader } from "@/components/providers/loader-provider";
import { projectCount } from "@/data/projects";
import { siteConfig } from "@/data/site";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

const HEADLINE_LINES = [
  ["Turning", "ideas"],
  ["into", "functional"],
  ["and", "creative"],
  ["solutions."],
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const { ready } = useLoader();

  useGSAP(
    () => {
      if (!ready) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const timeline = gsap.timeline({
        delay: 0.05,
        defaults: { ease: "power3.out" },
      });

      timeline
        .from(".hero-eyebrow", { y: 14, opacity: 0, duration: 0.7 })
        .from(
          ".hero-word",
          {
            yPercent: 118,
            duration: 1.05,
            stagger: 0.045,
            ease: "power4.out",
          },
          0.08,
        )
        .from(".hero-copy", { y: 18, opacity: 0, duration: 0.8 }, 0.5)
        .from(".hero-actions", { y: 14, opacity: 0, duration: 0.7 }, 0.64)
        .from(".hero-meta", { y: 14, opacity: 0, duration: 0.7 }, 0.76)
        .from(
          ".hero-portrait",
          { y: 34, opacity: 0, duration: 1.15, ease: "power3.out" },
          0.24,
        )
        .from(
          ".hero-shape",
          { opacity: 0, scale: 0.9, duration: 1.1 },
          0.4,
        )
        .from(".hero-scroll", { opacity: 0, duration: 0.6 }, 1.05);
    },
    { scope: sectionRef, dependencies: [ready], revertOnUpdate: true },
  );

  useGSAP(
    () => {
      const section = sectionRef.current;
      const portrait = portraitRef.current;
      if (!section || !portrait) return;

      const finePointer = window.matchMedia("(pointer: fine)").matches;
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (!finePointer || reduceMotion) return;

      const xTo = gsap.quickTo(portrait, "x", {
        duration: 0.9,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(portrait, "y", {
        duration: 0.9,
        ease: "power3.out",
      });

      const handleMove = (event: PointerEvent) => {
        const rect = section.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - 0.5;
        const y = (event.clientY - rect.top) / rect.height - 0.5;
        xTo(x * 12);
        yTo(y * 12);
      };

      const handleLeave = () => {
        xTo(0);
        yTo(0);
      };

      section.addEventListener("pointermove", handleMove);
      section.addEventListener("pointerleave", handleLeave);

      return () => {
        section.removeEventListener("pointermove", handleMove);
        section.removeEventListener("pointerleave", handleLeave);
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      id="top"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative overflow-hidden pb-14 pt-32 sm:pt-36 lg:pb-20 lg:pt-40"
    >
      <div
        aria-hidden="true"
        className="paper-grid pointer-events-none absolute -right-24 top-24 hidden h-[26rem] w-[26rem] opacity-60 [mask-image:radial-gradient(circle_at_center,black,transparent_72%)] lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-40 hidden h-px w-24 bg-line-strong xl:block"
      />

      <div className="container-shell">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-8">
            <div className="hero-eyebrow flex items-center gap-3">
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full bg-accent"
              />
              <p className="mono-label text-[0.62rem]">
                {siteConfig.role}
              </p>
            </div>

            <h1
              id="hero-title"
              aria-label={siteConfig.headline}
              className="mt-6 font-display text-hero font-medium text-ink"
            >
              <span aria-hidden="true">
                {HEADLINE_LINES.map((line, lineIndex) => (
                  <span key={lineIndex} className="block">
                    {line.map((word, wordIndex) => (
                      <span
                        key={`${word}-${wordIndex}`}
                        className={cn(
                          "mr-[0.24em] inline-block overflow-hidden pb-[0.09em] align-bottom last:mr-0",
                        )}
                      >
                        <span
                          className={cn(
                            "hero-word inline-block will-change-transform",
                            word === "creative" && "text-accent-ink",
                          )}
                        >
                          {word}
                        </span>
                      </span>
                    ))}
                  </span>
                ))}
              </span>
            </h1>

            <p className="hero-copy mt-7 max-w-[34rem] text-base leading-relaxed text-muted-strong sm:text-lg">
              {siteConfig.intro}
            </p>

            <div className="hero-actions mt-9 flex flex-wrap items-center gap-3">
              <Link href="#works" className="btn btn-solid">
                Explore my work
                <ArrowDown className="size-4" strokeWidth={1.6} aria-hidden="true" />
              </Link>
              <Link href="#contact" className="btn btn-ghost">
                Get in touch
                <ArrowUpRight
                  className="size-4"
                  strokeWidth={1.6}
                  aria-hidden="true"
                />
              </Link>
            </div>

            <dl className="hero-meta mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-5">
              <div>
                <dt className="mono-label text-[0.56rem]">Selected projects</dt>
                <dd className="mt-1.5 text-sm text-ink">
                  {String(projectCount).padStart(2, "0")}
                </dd>
              </div>
              <div>
                <dt className="mono-label text-[0.56rem]">Focus</dt>
                <dd className="mt-1.5 text-sm text-ink">Web &amp; interface</dd>
              </div>
              <div>
                <dt className="mono-label text-[0.56rem]">Built with</dt>
                <dd className="mt-1.5 text-sm text-ink">Next.js · TypeScript</dd>
              </div>
            </dl>

            <a
              href="#about"
              className="hero-scroll mt-12 inline-flex items-center gap-4"
              aria-label="Scroll to the About section"
            >
              <span
                aria-hidden="true"
                className="relative block h-12 w-px overflow-hidden bg-line-strong"
              >
                <span className="scroll-dot absolute inset-x-0 top-0 block h-4 bg-accent" />
              </span>
              <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-muted">
                Scroll to explore
              </span>
            </a>
          </div>

          <div className="lg:col-span-4">
            <div className="relative mx-auto w-full max-w-[25rem] lg:ml-auto lg:mr-0">
              <div
                aria-hidden="true"
                className="hero-shape absolute -left-5 top-10 hidden h-[85%] w-[82%] border border-line-strong lg:block"
              />
              <div
                aria-hidden="true"
                className="hero-shape absolute -right-5 -top-5 hidden size-28 bg-accent-soft lg:block"
              />
              <div
                aria-hidden="true"
                className="hero-shape absolute -bottom-6 right-10 hidden size-16 border border-line-strong lg:block"
              />

              <div className="hero-portrait relative">
                <div
                  ref={portraitRef}
                  className="relative border border-line-strong bg-surface p-3 shadow-[0_36px_90px_-52px_rgba(0,0,0,0.45)] sm:p-4"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-surface-2">
                    <Image
                      src="/portrait.jpg"
                      alt="Fadayomi Emmanuel"
                      fill
                      loading="eager"
                      fetchPriority="high"
                      sizes="(min-width: 1024px) 400px, 90vw"
                      className="object-cover"
                    />

                    <span className="absolute left-3 top-3 border border-white/20 bg-black/35 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                      Fig. 01
                    </span>
                    <span className="absolute bottom-3 right-3 border border-white/20 bg-black/35 px-2 py-1 font-mono text-[0.56rem] uppercase tracking-[0.14em] text-white/85 backdrop-blur-sm">
                      EmmyCodes
                    </span>
                  </div>

                  <div className="mt-3 flex items-center justify-between gap-3 font-mono text-[0.58rem] uppercase tracking-[0.1em] text-muted">
                    <span>Fadayomi Emmanuel</span>
                    <span className="text-accent-ink">Software developer</span>
                  </div>
                </div>

                <div className="absolute -bottom-5 -left-4 hidden border border-line-strong bg-bg px-4 py-3 xl:block">
                  <p className="mono-label text-[0.56rem]">Design × Development</p>
                  <p className="mt-1 font-display text-sm">Design meets code</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
