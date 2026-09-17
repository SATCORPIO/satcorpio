"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";
import { THRESHOLD } from "./streetlevel";

/**
 * THE THRESHOLD, DRAWN.
 *
 * This title's hardest idea to carry in prose and its most valuable. The brief
 * splits it into two hooks   forfeiture is the stake, the safehouse is
 * inviolable   and they are only honest together: forfeiture alone reads as
 * punishment, and an uncrossable door alone reads as a game with no stakes.
 *
 * The argument is **spatial**, which is why a drawing settles in four seconds
 * what a paragraph spends a screen on. Three bands and one hard line:
 *
 *   **Inside** is closed on three sides and sealed on the fourth by the
 *   threshold itself. Nothing is taken here by anybody.
 *
 *   **The block** is dashed, not solid. Police presence is legal here and it is
 *   *priced*: a shared counter fills while they stand in it.
 *
 *   **The street** has no boundary at all. It simply runs off the right edge,
 *   because that is the honest shape of "everything you carry is forfeit".
 *
 * **The middle band is why this is a bespoke component rather than two boxes.**
 * Anybody can draw a safe room and a dangerous street. The band in between,
 * where presence is neither permitted nor forbidden but costed, and where the
 * crew can watch the cost being paid, is the part no competitor's page can
 * draw   and it is the answer to the reader's real question, which is never
 * "is my base safe" but "so they just wait outside, then?"
 *
 * **The one thing that crosses the threshold is the warning.** The dotted line
 * from the officer mark to the ping is the only mark in the drawing that passes
 * the hard line, and that is the design rather than an accident of layout: the
 * door does not open, and the crew is told anyway. If these coordinates are
 * ever edited, that is the invariant worth keeping.
 *
 * Same discipline as `CycleClock` and `ProofLine`: geometry from a table of
 * constants rather than a hand-tuned `d` string, GSAP drawing it once on
 * scroll, no canvas and no second WebGL context, and the whole argument in an
 * `aria-label` and in real text beneath so it survives with images off.
 *
 * **One deliberate difference from both of them.** They are graphs and they
 * stretch, so they carry `preserveAspectRatio="none"` and lean on
 * `vectorEffect` to keep the stroke honest. This is a *plan*. Stretching it
 * would squash the marks into ellipses and quietly misreport the geometry the
 * drawing exists to state, so it scales uniformly instead.
 */

/**
 * The box is cropped close to the drawing on purpose. An earlier pass left a
 * quarter of the height empty below the ground line, and because the figure
 * scales uniformly that dead space became real vertical gap on a wide screen:
 * the drawing read as small and floating rather than as a plan.
 */
const VIEW = { w: 620, h: 176 };

/** The bands, as equal thirds, so the drawing lines up with the list beneath. */
const X0 = 18;
const X1 = 212;
const X2 = 406;
const X3 = 602;

const TOP = 22;
const BOTTOM = 148;

/** The officer standing in the block, and the ping it puts on the crew's HUD. */
const OFFICER = { x: 300, y: 70 };
const PING = { x: 176, y: 70 };

/** The shared counter, part filled. It belongs to the block, not the officer. */
const COUNTER = { x: 236, y: 106, w: 146, h: 7, filled: 0.62 };

/**
 * Open ground, thinning to the right. The street is not bounded.
 *
 * Six marks rather than four, and they fade gently instead of to nothing. The
 * first pass had the right-hand third almost bare, which is defensible as
 * argument   no boundary is the point   and wrong as drawing: it read as a
 * figure somebody had not finished rather than as ground that keeps going, and
 * it put the least visual weight on the band that carries the most risk.
 */
const STREET_MARKS: readonly [number, number][] = [
  [420, 0.34],
  [452, 0.3],
  [484, 0.26],
  [516, 0.22],
  [548, 0.18],
  [580, 0.14],
];

/**
 * Inside, open on its right-hand side. The threshold is drawn separately and
 * heavier, because the seal is the subject rather than the wall.
 */
const INSIDE_PATH = `M${X1} ${TOP} H${X0} V${BOTTOM} H${X1}`;

const DESCRIPTION =
  "A plan in three bands. Inside the safehouse, drawn closed, nothing can be taken by anyone. The block outside it is drawn in a broken line: police may stand there, and a shared counter fills while they do. Beyond it the street has no boundary at all, and everything carried across the threshold is forfeit on an arrest or a robbery. The only mark that crosses the threshold is a dotted line from the officer to the crew's warning.";

export function Threshold({ className = "" }: { className?: string }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const insideRef = useRef<SVGPathElement>(null);
  const lineRef = useRef<SVGLineElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion) return;
    const root = rootRef.current;
    const inside = insideRef.current;
    const line = lineRef.current;
    if (!root || !inside || !line) return;

    // Measured rather than assumed. A guessed dash length leaves a stub of
    // line showing before the draw starts, or clips the end of it.
    const insideLength = inside.getTotalLength();
    const lineLength = line.getTotalLength();
    const block = root.querySelectorAll("[data-block]");
    const marks = root.querySelectorAll("[data-mark]");
    const fill = root.querySelector("[data-counter-fill]");

    const timeline = gsap.timeline({
      scrollTrigger: { trigger: root, start: "top 82%", once: true },
    });

    timeline
      // The room first: it is the thing the rest of the drawing is about.
      .fromTo(
        inside,
        { strokeDasharray: insideLength, strokeDashoffset: insideLength },
        { strokeDashoffset: 0, duration: 1.1, ease: "power2.inOut" },
      )
      // Then the seal, fast and hard. A threshold that eases into place is a
      // threshold that looks negotiable.
      .fromTo(
        line,
        { strokeDasharray: lineLength, strokeDashoffset: lineLength },
        { strokeDashoffset: 0, duration: 0.32, ease: "power3.out" },
        0.85,
      )
      .fromTo(
        block,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.5, stagger: 0.1 },
        1.05,
      )
      .fromTo(
        marks,
        { autoAlpha: 0 },
        { autoAlpha: 1, duration: 0.45, stagger: 0.22 },
        1.3,
      );

    // The counter fills last, and it is the only thing in the drawing that
    // depicts time passing rather than a state.
    if (fill) {
      timeline.fromTo(
        fill,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.9, ease: "none", transformOrigin: "left center" },
        1.5,
      );
    }

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
      gsap.set([inside, line, ...block, ...marks, ...(fill ? [fill] : [])], {
        clearProps:
          "opacity,visibility,strokeDasharray,strokeDashoffset,transform,scaleX",
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
      >
        {/* Ground. Furniture, so it is bone rather than accent, and it runs the
            full width because the ground does not stop at the door. */}
        <line
          x1={X0}
          y1={BOTTOM}
          x2={X3}
          y2={BOTTOM}
          stroke="#9c968c"
          strokeOpacity={0.22}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />

        {/* ---------- THE STREET ----------
            Unbounded on purpose. Faint marks thinning to the right say "open,
            and it keeps going" without drawing an edge that is not there. */}
        {STREET_MARKS.map(([x, opacity]) => (
          <line
            key={x}
            x1={x}
            y1={BOTTOM - 30}
            x2={x}
            y2={BOTTOM}
            stroke="#9c968c"
            strokeOpacity={opacity}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* ---------- THE BLOCK ----------
            Broken on every side it has. Presence here is legal, which is
            exactly why it cannot be drawn as a wall. */}
        <g data-block>
          <line
            x1={X1}
            y1={TOP}
            x2={X2}
            y2={TOP}
            stroke="#9c968c"
            strokeOpacity={0.45}
            strokeWidth={1}
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
          />
          <line
            x1={X2}
            y1={TOP}
            x2={X2}
            y2={BOTTOM}
            stroke="#9c968c"
            strokeOpacity={0.45}
            strokeWidth={1}
            strokeDasharray="6 6"
            vectorEffect="non-scaling-stroke"
          />
        </g>

        {/* The shared counter. It belongs to the perimeter rather than to the
            officer standing in it, which is the rule that makes rotating a
            precinct through the block worse than standing still. */}
        <g data-block>
          <rect
            x={COUNTER.x}
            y={COUNTER.y}
            width={COUNTER.w}
            height={COUNTER.h}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.4}
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
          />
          <rect
            data-counter-fill
            x={COUNTER.x}
            y={COUNTER.y}
            width={COUNTER.w * COUNTER.filled}
            height={COUNTER.h}
            fill="currentColor"
            fillOpacity={0.55}
          />
        </g>

        {/* ---------- INSIDE ----------
            Closed on three sides. The fourth is the threshold. */}
        <path
          ref={insideRef}
          d={INSIDE_PATH}
          fill="none"
          stroke="currentColor"
          strokeOpacity={0.55}
          strokeWidth={1.5}
          strokeLinejoin="miter"
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />

        {/* ---------- THE WARNING ----------
            The only mark in the drawing that crosses the hard line. Dotted,
            because information passes and nothing else does. Drawn before the
            threshold so the heavy line sits over it. */}
        <line
          data-mark
          x1={OFFICER.x}
          y1={OFFICER.y}
          x2={PING.x}
          y2={PING.y}
          stroke="#9c968c"
          strokeOpacity={0.5}
          strokeWidth={1}
          strokeDasharray="1 5"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />

        {/* ---------- THE THRESHOLD ----------
            Solid, heavy, and the only unbroken vertical in the drawing. */}
        <line
          ref={lineRef}
          x1={X1}
          y1={TOP}
          x2={X1}
          y2={BOTTOM}
          stroke="currentColor"
          strokeWidth={3.5}
          strokeLinecap="butt"
          vectorEffect="non-scaling-stroke"
        />

        {/* The officer, in the block. Bone: they are the condition, not the
            subject. */}
        <circle
          data-mark
          cx={OFFICER.x}
          cy={OFFICER.y}
          r={4}
          fill="#9c968c"
        />

        {/* The ping, inside. Accent, and drawn as a signal rather than a dot,
            because the crew being *told* is the point of the whole band. */}
        <g data-mark>
          <circle cx={PING.x} cy={PING.y} r={3} fill="currentColor" />
          <path
            d={`M${PING.x - 9} ${PING.y - 8} A 12 12 0 0 0 ${PING.x - 9} ${PING.y + 8}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.7}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={`M${PING.x - 15} ${PING.y - 13} A 19 19 0 0 0 ${PING.x - 15} ${PING.y + 13}`}
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.35}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
        </g>
      </svg>

      {/* The three bands, in words. Not a caption for the drawing   the same
          information in the form that survives a phone, a screen reader and
          images being off. The columns line up with the thirds above. */}
      <ol className="mt-6 grid gap-6 border-t border-bone/10 pt-6 sm:grid-cols-3">
        {THRESHOLD.bands.map((band) => (
          <li key={band.name}>
            <h4 className="font-display text-xl text-bone">{band.name}</h4>
            <p className="mt-2 font-mono text-[0.66rem] leading-relaxed text-accent/85">
              {band.rule}
            </p>
            <p className="mt-3 font-mono text-[0.68rem] leading-relaxed text-bone-dim">
              {band.body}
            </p>
          </li>
        ))}
      </ol>

      <figcaption className="mt-7 max-w-2xl border-t border-bone/10 pt-6 font-display text-lg italic leading-relaxed text-accent">
        {THRESHOLD.coda}
      </figcaption>
    </figure>
  );
}
