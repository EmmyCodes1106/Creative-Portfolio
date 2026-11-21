"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useLoader } from "@/components/providers/loader-provider";
import { BrandWordmark } from "@/components/site/brand";
import { INTRO_STORAGE_KEY } from "@/lib/theme";

export function Preloader() {
  const { setReady } = useLoader();
  const rootRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const barRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadySeen = document.documentElement.classList.contains("intro-seen");

    if (reduce || alreadySeen) {
      root.style.display = "none";
      document.documentElement.classList.add("intro-seen");
      setReady(true);
      return;
    }

    let done = false;
    let exiting = false;
    const counter = { value: 0 };

    const render = () => {
      if (numberRef.current) {
        numberRef.current.textContent = String(Math.round(counter.value)).padStart(
          2,
          "0",
        );
      }
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${counter.value / 100})`;
      }
    };

    const timeline = gsap.timeline();
    timeline.to(counter, {
      value: 88,
      duration: 0.85,
      ease: "power2.out",
      onUpdate: render,
    });

    const finish = () => {
      if (done) return;
      done = true;
      try {
        window.sessionStorage.setItem(INTRO_STORAGE_KEY, "seen");
      } catch {
        // Storage may be unavailable; the intro simply repeats next load.
      }
      document.documentElement.classList.add("intro-seen");
      setReady(true);
    };

    const exit = () => {
      if (exiting || done) return;
      exiting = true;
      timeline.kill();
      gsap.to(counter, {
        value: 100,
        duration: 0.22,
        ease: "power1.out",
        onUpdate: render,
        onComplete: () => {
          gsap.to(root, {
            yPercent: -100,
            duration: 0.7,
            ease: "power4.inOut",
            delay: 0.08,
            onComplete: finish,
          });
        },
      });
    };

    const checkReady = () => {
      if (document.readyState === "complete") {
        exit();
      } else {
        window.addEventListener("load", exit, { once: true });
      }
    };

    // Give fonts and images a moment, but never hold the page hostage.
    const startTimer = window.setTimeout(checkReady, 700);
    const capTimer = window.setTimeout(exit, 2200);

    return () => {
      timeline.kill();
      window.clearTimeout(startTimer);
      window.clearTimeout(capTimer);
      window.removeEventListener("load", exit);
      gsap.killTweensOf(counter);
    };
  }, [setReady]);

  return (
    <div
      ref={rootRef}
      className="preloader fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-5 py-6 text-ink sm:px-8 sm:py-8"
      aria-hidden="true"
    >
      <div className="flex items-center justify-between">
        <BrandWordmark className="h-[1.15rem] w-auto" />
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.16em] text-muted">
          Portfolio — 2026
        </span>
      </div>

      <div className="flex items-end justify-between gap-6">
        <div className="max-w-[16rem]">
          <p className="mono-label">Loading experience</p>
          <p className="mt-3 text-sm leading-relaxed text-muted-strong">
            Fadayomi Emmanuel
            <br />
            Software developer &amp; creative technologist
          </p>
        </div>
        <span className="flex items-end gap-2">
          <span
            ref={numberRef}
            className="font-display text-[clamp(4.5rem,15vw,11rem)] font-medium leading-[0.8] tracking-[-0.06em] tabular-nums"
          >
            00
          </span>
          <span className="mb-2 font-mono text-xs tracking-[0.1em] text-muted">
            %
          </span>
        </span>
      </div>

      <div className="mt-8 h-px w-full overflow-hidden bg-line">
        <span
          ref={barRef}
          className="block h-px w-full origin-left bg-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </div>
  );
}
