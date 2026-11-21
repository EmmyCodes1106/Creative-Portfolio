"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/theme-provider";
import { ACCENTS } from "@/lib/theme";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      title={label}
      className={cn(
        "grid size-9 place-items-center text-ink transition-colors hover:text-accent-ink",
        className,
      )}
    >
      {isDark ? (
        <Sun className="size-[1.05rem]" strokeWidth={1.6} aria-hidden="true" />
      ) : (
        <Moon className="size-[1.05rem]" strokeWidth={1.6} aria-hidden="true" />
      )}
    </button>
  );
}

export function AccentSwatches({ className }: { className?: string }) {
  const { accent, setAccent } = useTheme();

  return (
    <div
      role="group"
      aria-label="Accent colour"
      className={cn("flex items-center gap-0.5", className)}
    >
      {ACCENTS.map((option) => {
        const isActive = option.id === accent;
        return (
          <button
            key={option.id}
            type="button"
            onClick={() => setAccent(option.id)}
            aria-pressed={isActive}
            aria-label={`${option.label} accent colour`}
            title={option.label}
            className="grid size-6 place-items-center rounded-full"
          >
            <span
              aria-hidden="true"
              className={cn(
                "block size-3.5 rounded-full transition-transform duration-300",
                isActive
                  ? "scale-100 ring-2 ring-ink ring-offset-2 ring-offset-bg"
                  : "ring-1 ring-line-strong hover:scale-110",
              )}
              style={{ backgroundColor: option.hex }}
            />
          </button>
        );
      })}
    </div>
  );
}
