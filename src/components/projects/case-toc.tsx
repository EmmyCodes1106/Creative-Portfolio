"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CaseTocSection = {
  id: string;
  label: string;
};

const TRIGGER_OFFSET = 160;

export function CaseToc({ sections }: { sections: CaseTocSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");
  const [progress, setProgress] = useState(0);
  const frame = useRef(0);
  const key = sections.map((section) => section.id).join("|");

  useEffect(() => {
    const measure = () => {
      const offsets = sections.flatMap(({ id }) => {
        const element = document.getElementById(id);
        if (!element) return [];
        const rect = element.getBoundingClientRect();
        return [
          {
            id,
            top: rect.top + window.scrollY,
            bottom: rect.bottom + window.scrollY,
          },
        ];
      });

      if (!offsets.length) return;

      const marker = window.scrollY + TRIGGER_OFFSET;
      let current = offsets[0].id;
      for (const section of offsets) {
        if (marker >= section.top) current = section.id;
      }
      setActiveId(current);

      const start = offsets[0].top;
      const end =
        offsets[offsets.length - 1].bottom - window.innerHeight * 0.5;
      const ratio = end > start ? (marker - start) / (end - start) : 0;
      setProgress(Math.min(1, Math.max(0, ratio)));
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame.current);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const activeIndex = sections.findIndex((section) => section.id === activeId);

  return (
    <nav aria-label="Case study sections">
      <div className="flex items-center justify-between gap-3">
        <p className="mono-label">On this page</p>
        <span
          className="font-mono text-[0.56rem] tabular-nums tracking-[0.1em] text-muted"
          aria-hidden="true"
        >
          {Math.round(progress * 100)}%
        </span>
      </div>

      <div className="relative mt-3 pl-5">
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-px bg-line"
        />
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 w-px bg-accent transition-[height] duration-150 ease-out motion-reduce:transition-none"
          style={{ height: `${progress * 100}%` }}
        />

        <ul className="space-y-2">
          {sections.map(({ id, label }, index) => {
            const isActive = id === activeId;
            return (
              <li key={id} className="relative">
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-5 top-[0.42rem] size-1.5 -translate-x-1/2 rounded-full transition-colors motion-reduce:transition-none",
                    isActive
                      ? "bg-accent"
                      : index < activeIndex
                        ? "bg-accent/35"
                        : "bg-line-strong",
                  )}
                />
                <a
                  href={`#${id}`}
                  aria-current={isActive ? "location" : undefined}
                  className={cn(
                    "block font-mono text-[0.62rem] uppercase tracking-[0.1em] transition-colors hover:text-accent-ink",
                    isActive ? "text-ink" : "text-muted-strong",
                  )}
                >
                  {label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
