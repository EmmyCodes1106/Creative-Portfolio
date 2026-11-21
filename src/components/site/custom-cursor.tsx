"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (!finePointer || reduceMotion) return;

    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    gsap.set(ring, { xPercent: -50, yPercent: -50 });
    gsap.set(label, { opacity: 0, scale: 0.9 });

    const ringX = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ringY = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    let visible = false;

    const show = () => {
      if (visible) return;
      visible = true;
      gsap.to(ring, { opacity: 1, duration: 0.25, overwrite: true });
    };

    const hide = () => {
      visible = false;
      gsap.to(ring, { opacity: 0, duration: 0.2, overwrite: true });
      gsap.to(label, { opacity: 0, duration: 0.15, overwrite: true });
      ring.classList.remove("is-link", "is-view");
      gsap.to(ring, { width: 38, height: 38, duration: 0.25 });
    };

    const handleMove = (event: PointerEvent) => {
      show();
      ringX(event.clientX);
      ringY(event.clientY);
    };

    const handleOver = (event: Event) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const interactive = target.closest("a, button, [data-cursor]");
      const isView = interactive?.getAttribute("data-cursor") === "view";
      const size = isView ? 92 : interactive ? 54 : 38;

      ring.classList.toggle("is-link", Boolean(interactive) && !isView);
      ring.classList.toggle("is-view", isView);
      gsap.to(ring, {
        width: size,
        height: size,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });

      if (isView) {
        label.textContent =
          interactive?.getAttribute("data-cursor-label") || "View project";
        gsap.to(label, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.out",
          overwrite: true,
        });
      } else {
        gsap.to(label, {
          opacity: 0,
          scale: 0.9,
          duration: 0.2,
          overwrite: true,
        });
      }
    };

    const handleDown = () => {
      gsap.to(ring, { scale: 0.86, duration: 0.2, overwrite: true });
    };

    const handleUp = () => {
      gsap.to(ring, { scale: 1, duration: 0.25, overwrite: true });
    };

    const handleLeave = (event: MouseEvent) => {
      if (event.relatedTarget === null) hide();
    };

    window.addEventListener("pointermove", handleMove, { passive: true });
    document.addEventListener("pointerover", handleOver);
    document.addEventListener("pointerdown", handleDown);
    document.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      document.removeEventListener("pointerover", handleOver);
      document.removeEventListener("pointerdown", handleDown);
      document.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeave);
      gsap.killTweensOf([ring, label]);
    };
  }, []);

  return (
    <div className="cursor-layer" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring">
        <span ref={labelRef} className="cursor-label" />
      </div>
    </div>
  );
}
