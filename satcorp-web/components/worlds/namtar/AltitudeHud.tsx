"use client";

import { useEffect, useRef } from "react";
import { scrollProgress } from "@/lib/scroll-progress";
import { useReducedMotion } from "@/lib/tier";
import { ACTS, surfaceBlend } from "./journey";

/**
 * The one piece of game chrome on the site: a descent readout in the corner,
 * counting down as the page falls out of orbit.
 *
 * Written straight to the DOM node from a frame loop rather than through
 * state — it changes every frame and nothing else needs to know.
 */

const ORBIT_ALTITUDE = 412;

export function AltitudeHud() {
  const altitude = useRef<HTMLSpanElement>(null);
  const stage = useRef<HTMLSpanElement>(null);
  const bar = useRef<HTMLSpanElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    let frame = 0;
    let lastStage = "";

    const tick = () => {
      const t = scrollProgress.value;
      const blend = surfaceBlend(t);

      // Orbital altitude down to a hover, then back out with the closing act.
      const km = ORBIT_ALTITUDE * (1 - blend) + 0.4 * blend;
      if (altitude.current) {
        altitude.current.textContent =
          km >= 10 ? km.toFixed(0) : km.toFixed(2);
      }

      const label =
        t < ACTS.descent[0]
          ? "HIGH ORBIT"
          : t < ACTS.flyover[0]
            ? "ATMOSPHERIC ENTRY"
            : t < ACTS.horizon[0]
              ? "LOW PASS"
              : t < ACTS.ascent[0]
                ? "HOLDING · SURFACE"
                : "ASCENT";
      if (stage.current && label !== lastStage) {
        stage.current.textContent = label;
        lastStage = label;
      }

      if (bar.current) bar.current.style.transform = `scaleX(${t})`;

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed bottom-5 left-5 z-20 hidden select-none sm:block"
    >
      <p className="font-mono text-[0.55rem] tracking-[0.28em] text-accent/80">
        <span ref={stage}>HIGH ORBIT</span>
      </p>
      <p className="mt-1.5 font-mono text-[0.7rem] tracking-[0.14em] text-bone/70">
        ALT <span ref={altitude}>412</span> KM
      </p>
      <span className="mt-2 block h-px w-28 bg-bone/15">
        <span
          ref={bar}
          className="block h-px w-full origin-left scale-x-0 bg-accent"
        />
      </span>
    </div>
  );
}
