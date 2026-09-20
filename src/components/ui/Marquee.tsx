"use client";

import { Children } from "react";
import type { ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: ReactNode;
  /** Seconds for one full loop. Lower = faster. */
  durationSec?: number;
  /** Scroll direction. */
  direction?: "left" | "right";
  /** Pause the animation while the pointer is over the track. */
  pauseOnHover?: boolean;
  className?: string;
  /** Gap between items, in Tailwind spacing (applied via inline gap). */
  gap?: number;
  ariaLabel?: string;
}

/**
 * Infinite auto-scrolling marquee. The item set is rendered twice so the
 * translateX(-50%) loop is seamless. When the user prefers reduced motion,
 * it degrades to a normal horizontal scroll strip (no animation).
 */
export function Marquee({
  children,
  durationSec = 40,
  direction = "left",
  pauseOnHover = true,
  className,
  gap = 24,
  ariaLabel,
}: MarqueeProps) {
  const reduce = useReducedMotion();
  const items = Children.toArray(children);

  // Reduced motion: static, manually scrollable row.
  if (reduce) {
    return (
      <div
        className={cn("scroll-strip", className)}
        style={{ gap }}
        role="list"
        aria-label={ariaLabel}
      >
        {items.map((child, i) => (
          <div role="listitem" key={i} className="shrink-0">
            {child}
          </div>
        ))}
      </div>
    );
  }

  const animation =
    direction === "left" ? "marquee-left" : "marquee-right";

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden",
        // Fade the edges so cards slide in/out smoothly.
        "[mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]",
        className,
      )}
      aria-label={ariaLabel}
      role="region"
    >
      <div
        className={cn(
          "flex w-max",
          pauseOnHover && "group-hover:[animation-play-state:paused]",
          "focus-within:[animation-play-state:paused]",
        )}
        style={{
          gap,
          animation: `${animation} ${durationSec}s linear infinite`,
        }}
      >
        {/* First copy */}
        {items.map((child, i) => (
          <div key={`a-${i}`} className="shrink-0">
            {child}
          </div>
        ))}
        {/* Duplicate copy for the seamless loop (hidden from a11y tree). */}
        {items.map((child, i) => (
          <div key={`b-${i}`} className="shrink-0" aria-hidden="true">
            {child}
          </div>
        ))}
      </div>
    </div>
  );
}
