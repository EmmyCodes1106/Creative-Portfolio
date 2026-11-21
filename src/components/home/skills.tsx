"use client";

import { useRef } from "react";
import {
  Atom,
  Braces,
  CodeXml,
  Component,
  FileCode,
  GitBranch,
  GitFork,
  LayoutGrid,
  Palette,
  PenTool,
  Route,
  Triangle,
  Wind,
} from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { skillGroups, type SkillIcon } from "@/data/skills";

const iconMap = {
  "file-code": FileCode,
  palette: Palette,
  braces: Braces,
  code: CodeXml,
  atom: Atom,
  component: Component,
  wind: Wind,
  "git-branch": GitBranch,
  "git-fork": GitFork,
  triangle: Triangle,
  "pen-tool": PenTool,
  "layout-grid": LayoutGrid,
  route: Route,
} satisfies Record<SkillIcon, typeof FileCode>;

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const wrapper = wrapperRef.current;
      const track = trackRef.current;
      if (!section || !wrapper || !track) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      /* Match the media query to only run on md+ screens */
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        /* Calculate how far the track needs to slide */
        const getScrollAmount = () =>
          track.scrollWidth - wrapper.offsetWidth;

        gsap.to(track, {
          x: () => -getScrollAmount(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${getScrollAmount()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      id="skills"
      aria-labelledby="skills-title"
      className="section-rule"
    >
      <div className="container-shell pt-[clamp(4.5rem,10vw,8.5rem)]">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mono-label">03 / Technical skills</p>
            <h2
              id="skills-title"
              className="mt-4 font-display text-section font-medium text-ink"
            >
              Tools I build with.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="max-w-sm text-sm leading-relaxed text-muted-strong lg:ml-auto">
              No percentage bars — just the technologies and design tools I
              work with to take ideas from concept to interface.
            </p>
          </div>
        </div>
      </div>

      {/* Horizontal-scroll wrapper – overflow is clipped here, not on the
          pinned section itself, so ScrollTrigger pin works cleanly. */}
      <div ref={wrapperRef} className="mt-14 overflow-hidden">
        <div
          ref={trackRef}
          className="
            flex gap-8
            px-[clamp(1.25rem,4.5vw,4rem)]
            pb-[clamp(4.5rem,10vw,8.5rem)]
            will-change-transform

            max-md:grid max-md:grid-cols-1 max-md:gap-y-10
          "
        >
          {skillGroups.map((group, groupIndex) => (
            <div
              key={group.title}
              className="w-full shrink-0 border-t border-line-strong pt-5 md:w-[clamp(18rem,25vw,24rem)]"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-display text-title font-medium text-ink">
                  {group.title}
                </h3>
                <span className="mono-label text-right text-[0.54rem]">
                  {String(groupIndex + 1).padStart(2, "0")} / {group.label}
                </span>
              </div>

              <ul className="mt-4">
                {group.items.map((item, itemIndex) => {
                  const Icon = iconMap[item.icon];
                  return (
                    <li
                      key={item.name}
                      className="group flex items-center justify-between gap-4 border-b border-line py-3"
                    >
                      <span className="flex items-center gap-3">
                        <Icon
                          className="size-4 text-muted transition-colors duration-300 group-hover:text-accent-ink"
                          strokeWidth={1.5}
                          aria-hidden="true"
                        />
                        <span className="text-sm text-ink">{item.name}</span>
                      </span>
                      <span className="font-mono text-[0.55rem] tracking-[0.1em] text-muted">
                        {String(itemIndex + 1).padStart(2, "0")}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
