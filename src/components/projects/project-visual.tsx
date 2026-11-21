import Image from "next/image";
import { cn } from "@/lib/utils";

type ProjectVisualProps = {
  title: string;
  monogram: string;
  hue: string;
  variant?: number;
  label?: string;
  className?: string;
  src?: string;
  sizes?: string;
};

export function ProjectVisual({
  title,
  monogram,
  hue,
  variant = 0,
  label = "Screenshot placeholder",
  className,
  src,
  sizes = "(min-width: 768px) 50vw, 100vw",
}: ProjectVisualProps) {
  const flip = variant % 2 === 1;
  const rotation = (variant % 4) * 5 - 7;

  if (src) {
    return (
      <div
        role="img"
        aria-label={`${title} — website screenshot`}
        className={cn(
          "relative h-full w-full overflow-hidden bg-[#121317]",
          className,
        )}
      >
        <Image
          src={src}
          alt=""
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${title} — ${label.toLowerCase()}`}
      className={cn(
        "relative isolate h-full w-full overflow-hidden bg-[#121317]",
        className,
      )}
    >
      <svg
        viewBox="0 0 800 600"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <rect width="800" height="600" fill="#121317" />
        <g stroke="#262830" strokeWidth="1">
          {Array.from({ length: 9 }, (_, index) => (
            <line
              key={`v-${index}`}
              x1={index * 100}
              y1={0}
              x2={index * 100}
              y2={600}
            />
          ))}
          {Array.from({ length: 7 }, (_, index) => (
            <line
              key={`h-${index}`}
              x1={0}
              y1={index * 100}
              x2={800}
              y2={index * 100}
            />
          ))}
        </g>

        <circle
          cx={flip ? 170 : 620}
          cy={flip ? 430 : 170}
          r={190}
          fill={hue}
          opacity="0.14"
        />
        <circle
          cx={flip ? 170 : 620}
          cy={flip ? 430 : 170}
          r={120}
          fill="none"
          stroke={hue}
          strokeOpacity="0.5"
          strokeWidth="1.5"
        />
        <rect
          x={flip ? 90 : 500}
          y={flip ? 90 : 280}
          width="210"
          height="210"
          fill="none"
          stroke={hue}
          strokeOpacity="0.42"
          transform={`rotate(${rotation} ${flip ? 195 : 605} ${flip ? 195 : 385})`}
        />
        <path
          d={flip ? "M0 130 L800 300" : "M0 470 L800 380"}
          stroke="#3a3d46"
          strokeWidth="1"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col justify-between p-5 sm:p-6">
        <div className="flex items-center justify-between font-mono text-[0.55rem] uppercase tracking-[0.16em] text-white/55 sm:text-[0.6rem]">
          <span>{title}</span>
          <span>Placeholder</span>
        </div>

        <span className="select-none font-display text-[clamp(3.5rem,9vw,6.5rem)] font-medium leading-none tracking-[-0.06em] text-white/90">
          {monogram}
        </span>

        <div className="flex items-center justify-between border-t border-white/15 pt-3 font-mono text-[0.55rem] uppercase tracking-[0.14em] text-white/55 sm:text-[0.6rem]">
          <span>{label}</span>
          <span>800 × 600</span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute right-5 top-1/2 h-px w-16 bg-white/20 sm:right-6"
      />
    </div>
  );
}
