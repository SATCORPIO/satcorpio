"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";

/**
 * HEAT AND PROOF, DRAWN.
 *
 * FORFEITURE's hardest idea to carry in prose and its most valuable: this game
 * has two quantities, they behave differently, and the difference between them
 * is the entire detective loop. Every competitor in the space has one
 * wanted-level meter. Prose cannot land that distinction in the fifteen seconds
 * a reader gives a section before deciding this is another crime sandbox, so
 * the page gets exactly one bespoke visual and this is it.
 *
 * The shapes *are* the argument:
 *
 *   **Heat** is a smooth curve. It spikes when something happens and decays on
 *   its own. It is atmosphere   what the city suspects.
 *
 *   **Proof** is a stepped line. It sits at zero until somebody physically
 *   picks something up, then rises in discrete steps, because evidence is
 *   discrete. And it can *fall*   a scene swept, a chain of custody broken.
 *
 * That fall is the single most important shape on the page. A wanted meter
 * cannot draw a line that goes down because somebody bagged a shell casing and
 * then lost the paperwork, and that is precisely what is being advertised.
 *
 * Same engineering as `CycleClock`, for the same reasons: a polyline derived
 * from a table of points rather than a hand-tuned `d` string, so moving a beat
 * moves the drawing; `vectorEffect` holding the stroke even under a stretched
 * viewBox; GSAP drawing it once on scroll. Deliberately not a canvas   an SVG
 * says this better and still says it at 360px, in a screenshot, and in print.
 */

const VIEW = { w: 620, h: 168 };

const BASELINE = 152;
const START_X = 18;
const END_X = 602;

/**
 * HEAT   smooth, self-decaying. A crime at x=96 spikes it; nothing the player
 * or the police does afterwards changes its shape. That indifference is the
 * point: heat is weather.
 */
const HEAT: readonly [number, number][] = [
  [START_X, 148],
  [72, 146],
  [96, 42],
  [150, 56],
  [240, 78],
  [340, 98],
  [450, 116],
  [END_X, 132],
];

/**
 * PROOF   stepped, and it goes down as well as up.
 *
 * Read left to right: nothing exists until the scene is worked; two things are
 * recovered; the chain of custody breaks and half the case evaporates; the rest
 * holds and it is enough to charge.
 *
 * Written as corner points so the path renders as true steps. The invariant
 * worth checking if these are ever edited: the line must sit at BASELINE until
 * the first recovery, or the drawing claims evidence exists before anyone
 * collected any.
 */
const PROOF: readonly [number, number][] = [
  [START_X, BASELINE],
  [168, BASELINE],
  [168, 118],
  [252, 118],
  [252, 86],
  [368, 86],
  // The fall. Custody breaks and the case is worth less than it was.
  [368, 124],
  [470, 124],
  [470, 58],
  [END_X, 58],
];

/**
 * The beats, in order, at the x where each one happens. Rendered as marks on
 * the drawing and as a legible list beneath it   the list is not a caption for
 * the marks, it is the same information in the form that survives a phone.
 */
const BEATS: readonly { x: number; y: number; index: string; label: string }[] =
  [
    { x: 96, y: 42, index: "I", label: "A crime happens" },
    { x: 168, y: 118, index: "II", label: "The scene is worked" },
    { x: 368, y: 124, index: "III", label: "The chain of custody breaks" },
    { x: 470, y: 58, index: "IV", label: "Charges" },
  ];

function polyline(points: readonly [number, number][]): string {
  return points.map(([x, y], i) => `${i ? "L" : "M"}${x} ${y}`).join(" ");
}

const HEAT_PATH = polyline(HEAT);
const PROOF_PATH = polyline(PROOF);

const DESCRIPTION =
  "Two lines over one case. Heat spikes the moment a crime happens and then decays on its own, whatever anybody does. Proof stays at nothing until evidence is physically recovered, rises in steps as it is collected, falls when the chain of custody breaks, and only then climbs high enough to charge.";

export function ProofLine({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const heatRef = useRef<SVGPathElement>(null);
  const proofRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    const heat = heatRef.current;
    const proof = proofRef.current;
    if (!root || !heat || !proof) return;

    // Measured rather than assumed: a guessed dash length leaves a stub of
    // line showing before the draw starts, or clips the end of it.
    const heatLength = heat.getTotalLength();
    const proofLength = proof.getTotalLength();
    const marks = root.querySelectorAll("[data-beat]");

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 82%", once: true },
    });

    timeline
      .fromTo(
        heat,
        { strokeDasharray: heatLength, strokeDashoffset: heatLength },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
      )
      // Proof starts a beat late and finishes later. The lag is the argument:
      // suspicion is instant, a case is not.
      .fromTo(
        proof,
        { strokeDasharray: proofLength, strokeDashoffset: proofLength },
        { strokeDashoffset: 0, duration: 1.9, ease: "power2.inOut" },
        0.35,
      )
      .fromTo(
        marks,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, stagger: 0.28 },
        0.5,
      );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([heat, proof, ...marks], {
        clearProps: "opacity,visibility,strokeDasharray,strokeDashoffset",
      });
    };
  }, [reducedMotion]);

  return (
    <figure ref={rootRef} className={`text-accent ${className}`}>
      <svg
        viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
        role="img"
        aria-label={DESCRIPTION}
        className="w-full"
        preserveAspectRatio="none"
        style={{ height: "clamp(9rem, 22vw, 12rem)" }}
      >
        {/* The floor. Furniture, not data, so it is bone rather than accent. */}
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

        {BEATS.map((beat) => (
          <g key={beat.index} data-beat>
            <line
              x1={beat.x}
              y1={10}
              x2={beat.x}
              y2={BASELINE}
              stroke="currentColor"
              strokeOpacity={0.22}
              strokeWidth={1}
              strokeDasharray="2 6"
              vectorEffect="non-scaling-stroke"
            />
            <circle cx={beat.x} cy={beat.y} r={3} fill="currentColor" />
          </g>
        ))}

        {/* Heat, in bone: it is the condition, not the subject. */}
        <path
          d={HEAT_PATH}
          fill="none"
          stroke="#9c968c"
          strokeWidth={1.5}
          strokeLinejoin="round"
          strokeLinecap="round"
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
          ref={heatRef}
        />

        {/* Proof, in the accent, unbroken and heavier. It is the argument. */}
        <path
          ref={proofRef}
          d={PROOF_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinejoin="miter"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* The key. Two lines, and which is which is the whole point, so it is
          stated in words rather than left to a colour   the art bible's own
          accessibility rule, kept on the marketing surface too. */}
      <dl className="mt-5 grid gap-4 border-t border-bone/10 pt-5 sm:grid-cols-2">
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden
            className="mt-2 h-px w-6 shrink-0 border-t border-dashed border-bone-dim"
          />
          <div>
            <dt className="label text-[0.52rem]">Heat</dt>
            <dd className="mt-1 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              What the city suspects. Decays on its own.
            </dd>
          </div>
        </div>
        <div className="flex items-baseline gap-3">
          <span
            aria-hidden
            className="mt-2 h-0.5 w-6 shrink-0 bg-accent"
          />
          <div>
            <dt className="label text-[0.52rem] text-accent">Proof</dt>
            <dd className="mt-1 font-mono text-[0.68rem] leading-relaxed text-bone">
              What somebody physically recovered, and still holds.
            </dd>
          </div>
        </div>
      </dl>

      <ol className="mt-6 grid gap-3 sm:grid-cols-4">
        {BEATS.map((beat) => (
          <li key={beat.index} className="flex items-baseline gap-3">
            <span className="font-mono text-[0.6rem] text-accent/70">
              {beat.index}
            </span>
            <span className="font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              {beat.label}
            </span>
          </li>
        ))}
      </ol>

      <figcaption className="mt-6 max-w-2xl font-mono text-[0.68rem] leading-relaxed text-bone-dim/70">
        {DESCRIPTION}
      </figcaption>
    </figure>
  );
}
