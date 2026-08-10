"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";

/**
 * GROWTH INTELLIGENCE
 *
 * A broadcast-gallery analytics wall that draws itself as you reach it: the
 * line strokes on, the bars rise, the readouts count up.
 *
 * The numbers are hand-authored and deliberately flat data rather than
 * generated   these are a *mock*, and a mock that reshuffles on every render
 * is a mock that will eventually be screenshotted mid-shuffle. When PULSE has
 * real telemetry this component takes the same shape of props and nothing in
 * the page changes.
 */

const SERIES = [
  18, 24, 21, 32, 29, 41, 38, 52, 47, 61, 58, 73, 69, 84, 79, 96,
];

const BARS = [
  { label: "LIVE", value: 0.86 },
  { label: "VOD", value: 0.54 },
  { label: "CLIPS", value: 0.71 },
  { label: "SOCIAL", value: 0.42 },
  { label: "EVENTS", value: 0.63 },
];

const READOUTS = [
  { label: "ENGAGEMENT", value: 94, suffix: "%" },
  { label: "RETENTION", value: 78, suffix: "%" },
  { label: "REACH", value: 12, suffix: "×" },
];

const W = 560;
const H = 190;

/** The series as a polyline across the chart box. */
function seriesPath(): string {
  const max = Math.max(...SERIES);
  const step = W / (SERIES.length - 1);
  return SERIES.map((v, i) => {
    const x = i * step;
    const y = H - (v / max) * (H - 16) - 8;
    return `${i === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
  }).join(" ");
}

export function Dashboard() {
  const root = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    // The dash pattern has to be the path's real length. The markup ships a
    // deliberate over-estimate so the line is hidden before this runs, but
    // animating that value to zero would finish drawing at roughly half way
    // and then hold on a finished chart for the rest of the tween.
    const line = el.querySelector<SVGPathElement>("[data-line]");
    if (line) {
      const length = line.getTotalLength();
      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);
    }

    // Under reduced motion the chart is simply finished: full stroke, full
    // bars, final numbers. Content parity, no exceptions.
    if (reducedMotion) {
      el.querySelectorAll<SVGPathElement>("[data-line]").forEach((p) => {
        p.style.strokeDashoffset = "0";
      });
      el.querySelectorAll<HTMLElement>("[data-bar]").forEach((b) => {
        b.style.transform = "scaleY(1)";
      });
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((c) => {
        c.textContent = String(c.dataset.count);
      });
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: el, start: "top 72%", once: true },
      });

      timeline.to("[data-line]", {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.inOut",
      });

      timeline.to(
        "[data-bar]",
        { scaleY: 1, duration: 0.8, ease: "power3.out", stagger: 0.08 },
        "-=1.1",
      );

      // Counting is done on a proxy object rather than by parsing the DOM back
      // out on every tick.
      el.querySelectorAll<HTMLElement>("[data-count]").forEach((node, i) => {
        const target = Number(node.dataset.count);
        const proxy = { v: 0 };
        timeline.to(
          proxy,
          {
            v: target,
            duration: 1.1,
            ease: "power2.out",
            onUpdate: () => {
              node.textContent = String(Math.round(proxy.v));
            },
          },
          i === 0 ? "-=0.9" : "<",
        );
      });
    }, el);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <div
      ref={root}
      className="border border-bone/10 bg-ink-raised/70 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-[0.62rem] tracking-[0.2em] text-bone-dim">
          AUDIENCE  /  ROLLING 16
        </p>
        <span className="flex items-center gap-2 font-mono text-[0.58rem] tracking-[0.2em] text-blood-hot">
          <span
            aria-hidden
            className="size-1.5 rounded-full bg-current"
            style={{ animation: "live-pulse 1.6s ease-in-out infinite" }}
          />
          STREAMING
        </span>
      </div>

      {/* The line. */}
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="mt-6 w-full overflow-visible"
        role="img"
        aria-label="Audience trend rising across the last sixteen periods."
      >
        <defs>
          <linearGradient id="pulse-line" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-blood)" />
            <stop offset="100%" stopColor="var(--color-blood-hot)" />
          </linearGradient>
        </defs>

        {[0.25, 0.5, 0.75].map((g) => (
          <line
            key={g}
            x1={0}
            x2={W}
            y1={H * g}
            y2={H * g}
            stroke="currentColor"
            strokeWidth={1}
            className="text-bone/[0.07]"
          />
        ))}

        <path
          data-line
          d={seriesPath()}
          fill="none"
          stroke="url(#pulse-line)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          // A deliberate over-estimate, so the line is hidden from the first
          // paint. The effect replaces both with the measured path length
          // before anything animates.
          strokeDasharray={1400}
          strokeDashoffset={1400}
        />
      </svg>

      {/* The bars. */}
      <div className="mt-8 grid grid-cols-5 gap-3">
        {BARS.map((bar) => (
          <div key={bar.label} className="flex flex-col items-center gap-2">
            <div className="flex h-24 w-full items-end">
              <div
                data-bar
                className="w-full origin-bottom bg-gradient-to-t from-blood to-blood-hot"
                style={{ height: `${bar.value * 100}%`, transform: "scaleY(0)" }}
              />
            </div>
            <span className="font-mono text-[0.52rem] tracking-[0.16em] text-bone-dim/70">
              {bar.label}
            </span>
          </div>
        ))}
      </div>

      {/* The readouts. */}
      <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-bone/10 pt-6">
        {READOUTS.map((r) => (
          <div key={r.label}>
            <dt className="label text-[0.52rem]">{r.label}</dt>
            <dd className="mt-2 font-mono text-2xl text-bone">
              <span data-count={r.value}>0</span>
              {r.suffix}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
