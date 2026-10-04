"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Decorative animated backdrop: three slow-drifting colored blobs plus a
 * cursor-reactive spotlight. Purely visual (aria-hidden). Respects reduced
 * motion by rendering static blobs with no drift / no pointer tracking.
 */
export function AuroraBackground() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        el.style.setProperty("--mx", `${x}%`);
        el.style.setProperty("--my", `${y}%`);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [reduce]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      style={{ "--mx": "70%", "--my": "20%" } as React.CSSProperties}
    >
      {/* Drifting color blobs */}
      <span
        className="absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-[#7c5cff]/25 blur-[120px]"
        style={reduce ? undefined : { animation: "aurora 18s ease-in-out infinite" }}
      />
      <span
        className="absolute right-0 top-10 h-[380px] w-[380px] rounded-full bg-[#22d3ee]/20 blur-[120px]"
        style={
          reduce ? undefined : { animation: "aurora 22s ease-in-out infinite reverse" }
        }
      />
      <span
        className="absolute bottom-0 left-1/3 h-[360px] w-[360px] rounded-full bg-[#34d399]/15 blur-[120px]"
        style={reduce ? undefined : { animation: "aurora 26s ease-in-out infinite" }}
      />

      {/* Cursor-reactive spotlight (static center when reduced motion). */}
      {!reduce ? (
        <div
          className="absolute inset-0 transition-[background] duration-300"
          style={{
            background:
              "radial-gradient(500px circle at var(--mx) var(--my), rgba(124,92,255,0.12), transparent 60%)",
          }}
        />
      ) : null}
    </div>
  );
}
