"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import type { Project } from "@/data/projects";
import { ProjectVisual } from "@/components/projects/project-visual";
import { Reveal } from "@/components/animation/reveal";

type Quick = {
  x: (value: number) => void;
  y: (value: number) => void;
  rotate: (value: number) => void;
};

export function WorkList({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState<Project | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const quick = useRef<Quick | null>(null);
  const enabled = useRef(false);
  const activeRef = useRef<Project | null>(null);
  const lastPos = useRef({ x: 0, y: 0 });
  const lastX = useRef(0);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (!finePointer || reduceMotion) return;

    enabled.current = true;
    gsap.set(card, { xPercent: -50, yPercent: -55, opacity: 0, scale: 0.92 });

    quick.current = {
      x: gsap.quickTo(card, "x", { duration: 0.45, ease: "power3.out" }),
      y: gsap.quickTo(card, "y", { duration: 0.45, ease: "power3.out" }),
      rotate: gsap.quickTo(card, "rotation", { duration: 0.5, ease: "power3.out" }),
    };

    const handleMove = (event: PointerEvent) => {
      lastPos.current = { x: event.clientX, y: event.clientY };
      if (!activeRef.current) return;
      const q = quick.current;
      if (!q) return;
      const dx = event.clientX - lastX.current;
      lastX.current = event.clientX;
      q.rotate(Math.max(-7, Math.min(7, dx * 0.35)));
      q.x(event.clientX);
      q.y(event.clientY);
    };

    window.addEventListener("pointermove", handleMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handleMove);
      gsap.killTweensOf(card);
    };
  }, []);

  const show = (project: Project) => {
    if (!enabled.current) return;
    const card = cardRef.current;
    if (!card) return;
    activeRef.current = project;
    setActive(project);
    gsap.set(card, {
      x: lastPos.current.x,
      y: lastPos.current.y,
      rotation: 0,
    });
    gsap.to(card, {
      opacity: 1,
      scale: 1,
      duration: 0.28,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  const hide = () => {
    if (!enabled.current) return;
    activeRef.current = null;
    const card = cardRef.current;
    if (!card) return;
    gsap.to(card, {
      opacity: 0,
      scale: 0.94,
      duration: 0.2,
      ease: "power2.in",
      overwrite: "auto",
    });
  };

  return (
    <div>
      <Reveal>
        <ol className="border-t border-line" onPointerLeave={hide}>
          {projects.map((project, index) => (
            <li key={project.slug} className="border-b border-line">
              <Link
                href={`/projects/${project.slug}`}
                onPointerEnter={() => show(project)}
                className="group flex items-baseline gap-5 py-7 md:gap-8 md:py-9"
              >
                <span className="font-mono text-[0.62rem] tracking-[0.1em] text-muted">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <span className="flex-1 font-display text-3xl font-medium tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-accent-ink md:text-5xl">
                  {project.title}
                </span>
                <span className="hidden font-mono text-[0.6rem] uppercase tracking-[0.14em] text-muted-strong sm:block">
                  {project.category}
                </span>
                <ArrowUpRight
                  className="size-5 shrink-0 translate-y-[-0.15em] text-muted transition-all duration-300 group-hover:-translate-y-[0.3em] group-hover:translate-x-0.5 group-hover:text-accent-ink"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ol>
      </Reveal>

      <div ref={cardRef} aria-hidden="true" className="work-preview">
        {active ? (
          <>
            <div className="aspect-[16/10] overflow-hidden border border-line bg-surface-2">
              <ProjectVisual
                title={active.title}
                monogram={active.monogram}
                hue={active.hue}
                src={active.image}
                sizes="300px"
              />
            </div>
            <div className="flex items-baseline justify-between gap-3 px-3.5 py-3">
              <span className="font-display text-base font-medium tracking-[-0.02em] text-ink">
                {active.title}
              </span>
              <span className="font-mono text-[0.55rem] uppercase tracking-[0.12em] text-muted">
                {active.category}
              </span>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
