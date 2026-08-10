"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/tier";

/**
 * RESEARCH & PROGRESSION
 *
 * No levels   discoveries. Each card arrives as an unknown signal and resolves
 * into what it turned out to be as the reader reaches it.
 *
 * The real text is in the DOM from the first paint; the reveal is presentation
 * only, exactly as redaction is elsewhere on the site. Under reduced motion
 * every card is simply already resolved.
 */

export interface Artifact {
  file: string;
  name: string;
  note: string;
}

export function Artifacts({ artifacts }: { artifacts: Artifact[] }) {
  const list = useRef<HTMLUListElement>(null);
  const [revealed, setRevealed] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const el = list.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [reducedMotion]);

  const open = revealed || reducedMotion;

  return (
    <ul ref={list} className="grid gap-px sm:grid-cols-2">
      {artifacts.map((artifact, i) => (
        <li
          key={artifact.file}
          className="border border-bone/10 bg-ink-raised/70 p-6"
          style={{
            transitionDelay: open ? `${i * 90}ms` : undefined,
          }}
        >
          <p className="flex items-baseline justify-between gap-3 font-mono text-[0.55rem] tracking-[0.2em]">
            <span
              className={
                open ? "text-accent" : "animate-pulse text-bone-dim/50"
              }
            >
              {open ? "IDENTIFIED" : "UNKNOWN SIGNAL"}
            </span>
            <span className="text-bone-dim/40">{artifact.file}</span>
          </p>

          <p
            className="mt-4 font-display text-xl text-bone transition-[opacity,transform] duration-700 ease-[var(--ease-concierge)]"
            style={{
              transitionDelay: `${i * 90}ms`,
              opacity: open ? 1 : 0.18,
              transform: open ? "none" : "translateY(6px)",
              filter: open ? "none" : "blur(3px)",
            }}
          >
            {artifact.name}
          </p>

          <p
            className="mt-3 font-mono text-[0.7rem] leading-relaxed text-bone-dim transition-opacity duration-700"
            style={{
              transitionDelay: `${i * 90 + 120}ms`,
              opacity: open ? 1 : 0,
            }}
          >
            {artifact.note}
          </p>
        </li>
      ))}
    </ul>
  );
}
