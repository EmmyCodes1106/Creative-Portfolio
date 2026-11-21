"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

type ScrollTextProps = {
  text: string;
  className?: string;
};

export function ScrollText({ text, className }: ScrollTextProps) {
  const textRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const element = textRef.current;
      if (!element) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      if (reduceMotion) return;

      const wordElements = element.querySelectorAll<HTMLElement>(".scroll-word");
      if (!wordElements.length) return;

      gsap.fromTo(
        wordElements,
        { opacity: 0.18 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 86%",
            end: "bottom 58%",
            scrub: 0.35,
          },
        },
      );
    },
    { scope: textRef },
  );

  return (
    <p ref={textRef} className={cn(className)}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="inline-block">
            <span className="scroll-word inline-block">{word}</span>
            {index < words.length - 1 ? "\u00A0" : null}
          </span>
        ))}
      </span>
    </p>
  );
}
