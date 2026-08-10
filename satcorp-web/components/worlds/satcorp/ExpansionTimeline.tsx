"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";
import { Stamp } from "@/components/fingerprints/Stamp";

/**
 * THE EXPANSION TIMELINE
 *
 * Scrubs horizontally as the page scrolls past. Everything already standing is
 * legible; everything ahead is redacted and only partly gives itself up on
 * hover. The company has plans. You are not cleared for all of them.
 *
 * Under reduced motion it becomes an ordinary horizontally scrollable rail.
 */

interface Milestone {
  period: string;
  title: string;
  detail: string;
  state: "complete" | "active" | "sealed";
}

const MILESTONES: Milestone[] = [
  {
    period: "PHASE I",
    title: "Foundation",
    detail: "SATCORP established. In-house infrastructure stood up.",
    state: "complete",
  },
  {
    period: "PHASE II",
    title: "The Concierge Practice",
    detail: "ANU begins client engagements. Brand, web and systems work.",
    state: "complete",
  },
  {
    period: "PHASE III",
    title: "Ki-Ra Studios",
    detail: "Entertainment division formed. Live clusters self-hosted.",
    state: "active",
  },
  {
    period: "PHASE IV",
    title: "KYRAX Integration",
    detail: "The intelligence layer wired across every division.",
    state: "active",
  },
  {
    period: "PHASE V",
    title: "NAMTAR",
    detail: "The flagship survival universe reaches public reveal.",
    state: "sealed",
  },
  {
    period: "PHASE VI",
    title: "PULSE Network",
    detail: "Creator and community platform opens to partners.",
    state: "sealed",
  },
  {
    period: "PHASE VII",
    title: "[REDACTED]",
    detail: "You are not cleared for this one. Ask me in person.",
    state: "sealed",
  },
];

export function ExpansionTimeline() {
  const section = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const sectionEl = section.current;
    const railEl = rail.current;
    if (!sectionEl || !railEl) return;

    const ctx = gsap.context(() => {
      const distance = () => railEl.scrollWidth - window.innerWidth * 0.9;
      if (distance() <= 0) return;

      gsap.to(railEl, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: sectionEl,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, sectionEl);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={section}
      className="relative overflow-hidden border-y border-bone/10 py-20"
    >
      <div className="mx-auto max-w-6xl px-6">
        <p className="label label-accent">Expansion Timeline</p>
      </div>

      <div
        ref={rail}
        className={[
          "mt-12 flex gap-px pl-6 pr-[10vw]",
          // Reduced motion turns the pinned scrub into a plain swipe rail.
          reducedMotion ? "overflow-x-auto" : "w-max",
        ].join(" ")}
      >
        {MILESTONES.map((m) => {
          const sealed = m.state === "sealed";
          return (
            <article
              key={m.period}
              className="group w-[78vw] shrink-0 border border-bone/10 bg-ink-raised p-8 sm:w-[26rem]"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="label text-[0.55rem]">{m.period}</span>
                {m.state === "complete" && <Stamp tone="bone">COMPLETE</Stamp>}
                {m.state === "active" && <Stamp tone="blood">ACTIVE</Stamp>}
                {sealed && (
                  <Stamp tone="bone" rotate={4}>
                    SEALED
                  </Stamp>
                )}
              </div>

              <h3 className="mt-8 font-display text-3xl text-bone">
                {m.title}
              </h3>

              <p
                className={[
                  "mt-4 font-mono text-[0.72rem] leading-relaxed transition-all duration-500",
                  sealed
                    ? "text-transparent [text-shadow:0_0_10px_rgba(233,225,211,0.55)] group-hover:text-bone-dim group-hover:[text-shadow:none]"
                    : "text-bone-dim",
                ].join(" ")}
              >
                {m.detail}
              </p>

              <div
                aria-hidden
                className="mt-10 h-px w-full origin-left scale-x-100 bg-gradient-to-r from-blood to-transparent transition-transform duration-700 group-hover:scale-x-100"
              />
            </article>
          );
        })}
      </div>
    </section>
  );
}
