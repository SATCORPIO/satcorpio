"use client";

import { useEffect, useState } from "react";
import { setPillarFocus } from "./journey";

/**
 * The five pillars, as a list you can interrogate.
 *
 * Each row is a real button wired to the monolith standing on the terrain
 * behind the page: choosing one swings the camera onto it and lights its seam.
 * Choosing it again lets it go. The copy is complete whether or not the 3D
 * world is running, so nothing here depends on the canvas existing.
 */

export interface PillarCopy {
  name: string;
  body: string;
}

export function Pillars({ pillars }: { pillars: PillarCopy[] }) {
  const [focused, setFocused] = useState(-1);

  useEffect(() => {
    setPillarFocus(focused);
  }, [focused]);

  // Leaving the page with a monolith still selected would strand the camera
  // off centre for the next reader of this route.
  useEffect(() => () => setPillarFocus(-1), []);

  return (
    <ul className="mt-12 space-y-px">
      {pillars.map((pillar, i) => {
        const active = focused === i;
        return (
          <li key={pillar.name}>
            <button
              type="button"
              aria-pressed={active}
              onClick={() => setFocused(active ? -1 : i)}
              onMouseEnter={() => setPillarFocus(i)}
              onMouseLeave={() => setPillarFocus(focused)}
              className={`grid w-full items-baseline gap-4 border p-8 text-left transition-colors lg:grid-cols-[6rem_14rem_1fr] lg:gap-10 ${
                active
                  ? "border-accent/60 bg-accent/[0.06]"
                  : "border-bone/10 bg-ink-raised/70 hover:border-accent/40"
              }`}
            >
              <span className="font-mono text-[0.66rem] text-accent/70">
                {String(i + 1).padStart(2, "0")} / 05
              </span>
              <span className="font-display text-3xl text-bone">
                {pillar.name}
              </span>
              <span className="max-w-2xl leading-relaxed text-bone-dim">
                {pillar.body}
                <span
                  className={`mt-3 block font-mono text-[0.6rem] tracking-[0.2em] transition-colors ${
                    active ? "text-accent" : "text-bone-dim/40"
                  }`}
                >
                  {active ? "── HOLDING ON THE MONOLITH" : "SELECT TO FOCUS"}
                </span>
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
