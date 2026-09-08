"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";

/**
 * THE CYCLE, DRAWN.
 *
 * The differentiator has to be legible in about fifteen seconds, which is
 * roughly what a reader gives a section before deciding whether this is another
 * base-builder. Prose cannot do that on its own, so the page gets exactly one
 * bespoke visual and this is it.
 *
 * The shape *is* the argument. A rising sawtooth: the reading climbs with
 * everything the sector builds, the world answers, the line falls a little  
 * and then starts climbing again from higher than it started. Nothing about it
 * resolves. That is the whole pitch, and it is the one thing in this category
 * a static world map cannot draw.
 *
 * Deliberately not three.js. The Projection Room already owns the GPU on this
 * route and the performance budget is enforced; a second canvas here would cost
 * real frames to say something an SVG polyline says better. It is also the
 * reason this reads correctly at 360px, in a screenshot, and in print.
 *
 * The path is derived from a table of points rather than a hand-tuned `d`
 * string   same discipline as the PULSE trace, which measures its own geometry
 * instead of guessing it. Move a peak and the drawing follows.
 */

const VIEW = { w: 620, h: 168 };

/** Where the drawing lives inside the box. */
const BASELINE = 152;
const START_X = 18;
const END_X = 602;

/**
 * The trace, as [x, y]. SVG y grows downward, so a *smaller* y is a higher
 * threat reading.
 *
 * Two invariants make the shape mean what the copy says, and both are worth
 * checking if these numbers are ever edited:
 *
 *   every peak is higher than the peak before it   (112 > 88 > 64 > 40 > 24)
 *   every floor is higher than the floor before it (140 > 126 > 102 > 78 > 54)
 *
 * The second is the important one. A sawtooth that returns to the same floor
 * draws a game that resets. This one does not reset.
 */
const TRACE: readonly [number, number][] = [
  [START_X, 140],
  [110, 112],
  [116, 126],
  [230, 88],
  [236, 102],
  [350, 64],
  [356, 78],
  [470, 40],
  [476, 54],
  [END_X, 24],
];

/** The moment the Surge arms   the apex immediately before each fall. */
const SURGES: readonly [number, number][] = [
  [110, 112],
  [230, 88],
  [350, 64],
  [470, 40],
];

function polyline(points: readonly [number, number][]): string {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
}

const TRACE_PATH = polyline(TRACE);

const DESCRIPTION =
  "A threat reading climbing left to right. Four times it is answered by a Surge and falls back   and each time it resumes from higher than it began.";

export function CycleClock({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    const path = pathRef.current;
    if (!root || !path) return;

    // Measured, not assumed. A guessed dash length leaves a stub of line
    // visible before the draw starts, or clips the end of it.
    const length = path.getTotalLength();
    const marks = root.querySelectorAll("[data-surge]");

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 82%", once: true },
    });

    timeline
      .fromTo(
        path,
        { strokeDasharray: length, strokeDashoffset: length },
        { strokeDashoffset: 0, duration: 1.8, ease: "power2.inOut" },
      )
      .fromTo(
        marks,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, stagger: 0.24 },
        // The marks land as the line passes them, not after it arrives.
        0.35,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([path, ...marks], {
        clearProps: "opacity,visibility,strokeDasharray,strokeDashoffset",
      });
    };
  }, [reducedMotion]);

  return (
    <figure ref={rootRef} className={`text-accent ${className}`}>
      <div className="flex items-stretch gap-3">
        <span className="label shrink-0 self-center text-[0.5rem] [writing-mode:vertical-rl] [transform:rotate(180deg)]">
          Threat reading
        </span>

        <svg
          viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
          role="img"
          aria-label={DESCRIPTION}
          className="min-w-0 flex-1"
          preserveAspectRatio="none"
          style={{ height: "clamp(9rem, 22vw, 12rem)" }}
        >
          {/* The floor. Bone rather than accent: it is furniture, not data. */}
          <line
            x1={START_X}
            y1={BASELINE}
            x2={END_X}
            y2={BASELINE}
            stroke="currentColor"
            strokeOpacity={0.18}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />

          {SURGES.map(([x, y]) => (
            <g key={x} data-surge>
              <line
                x1={x}
                y1={10}
                x2={x}
                y2={BASELINE}
                stroke="currentColor"
                strokeOpacity={0.24}
                strokeWidth={1}
                strokeDasharray="2 6"
                vectorEffect="non-scaling-stroke"
              />
              <circle cx={x} cy={y} r={3} fill="currentColor" />
            </g>
          ))}

          <path
            ref={pathRef}
            d={TRACE_PATH}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.75}
            strokeLinejoin="round"
            strokeLinecap="round"
            // preserveAspectRatio="none" stretches the box; this keeps the
            // stroke an even weight at every viewport width.
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>

      <div className="mt-3 flex items-baseline justify-between gap-4 pl-6">
        <span className="label text-[0.5rem]">Sector age →</span>
        <span className="label text-[0.5rem] text-accent">
          ● Surge
        </span>
      </div>

      <figcaption className="mt-4 max-w-2xl font-mono text-[0.68rem] leading-relaxed text-bone-dim">
        {DESCRIPTION}
      </figcaption>
    </figure>
  );
}
