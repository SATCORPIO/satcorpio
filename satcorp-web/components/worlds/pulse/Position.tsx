"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useReducedMotion } from "@/lib/tier";
import { DIVISIONS, DIVISION_BY_ID, type DivisionId } from "@/lib/divisions";

/**
 * THE POSITION   the ecosystem diagram, §III of the build plan.
 *
 * The claim the page has never drawn: PULSE sits between people and every
 * experience SATCORP operates. Inline SVG rather than WebGL   the trace
 * already owns this page's one WebGL context (`SignalScene`), and browsers
 * cap how many may exist per document, so a second one is how the page loses
 * the first on mobile.
 *
 * The draw-on uses the same technique `Dashboard.tsx` already established:
 * `getTotalLength()` measured in the effect, never guessed. That exact bug
 * (a hardcoded dash length finishing the stroke at roughly half the tween)
 * was already found and fixed once in this codebase   see the README.
 *
 * The KYRAX edge is drawn differently on purpose, not for variety. Plan §7.3
 * requires the intelligence loop to stay visibly deferred rather than
 * demonstrated, so it never animates in with the other four: it renders
 * dashed, dim, and already there, the way a connection reads when it exists
 * on paper and not yet in practice.
 */

const CX = 320;
const CY = 150;
const R = 128;

interface Node {
  id: DivisionId;
  x: number;
  y: number;
}

// Every division but PULSE itself, arranged in a pentagon around the hub.
// Order matches lib/divisions.ts; angles start at the top and run clockwise.
const ORDER: DivisionId[] = ["satcorp", "anu", "kyrax", "kira", "namtar"];

const NODES: Node[] = ORDER.map((id, i) => {
  const angle = (i / ORDER.length) * Math.PI * 2 - Math.PI / 2;
  return {
    id,
    x: CX + R * Math.cos(angle),
    y: CY + R * Math.sin(angle),
  };
});

const LIVE_NODES = NODES.filter((n) => n.id !== "kyrax");
const KYRAX_NODE = NODES.find((n) => n.id === "kyrax")!;

export function Position() {
  const root = useRef<SVGSVGElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const svg = root.current;
    if (!svg) return;

    const lines = svg.querySelectorAll<SVGLineElement>("[data-line]");
    lines.forEach((line) => {
      const length = line.getTotalLength();
      line.style.strokeDasharray = String(length);
      line.style.strokeDashoffset = String(length);
    });

    if (reducedMotion) {
      lines.forEach((line) => {
        line.style.strokeDashoffset = "0";
      });
      svg.querySelectorAll<SVGCircleElement>("[data-node]").forEach((n) => {
        n.style.opacity = "1";
        n.style.transform = "scale(1)";
      });
      return;
    }

    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: { trigger: svg, start: "top 72%", once: true },
      });

      timeline.to("[data-line]", {
        strokeDashoffset: 0,
        duration: 1.1,
        ease: "power2.inOut",
        stagger: 0.12,
      });

      timeline.to(
        "[data-node]",
        { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(2)", stagger: 0.1 },
        "-=0.7",
      );
    }, svg);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <svg
      ref={root}
      viewBox={`0 0 ${CX * 2} ${CY * 2}`}
      className="w-full overflow-visible"
      role="img"
      aria-label="PULSE at the centre of the SATCORP ecosystem, connected to every division. The KYRAX connection is drawn but not yet active."
    >
      {/* The live connections   SATCORP, ANU, Ki-Ra, NAMTAR. Real today. */}
      {LIVE_NODES.map((node) => (
        <line
          key={node.id}
          data-line
          x1={CX}
          y1={CY}
          x2={node.x}
          y2={node.y}
          stroke="var(--color-blood-hot)"
          strokeWidth={1.5}
          strokeLinecap="round"
          // A deliberate over-estimate so the line is hidden from first
          // paint; the effect replaces both values with the measured length
          // before anything animates.
          strokeDasharray={400}
          strokeDashoffset={400}
        />
      ))}

      {/* The KYRAX connection. Deferred, and drawn to say so: dashed, dim,
          static from the first paint rather than drawing in with the rest.
          Plan §7.3   named and deferred, never demonstrated. */}
      <line
        x1={CX}
        y1={CY}
        x2={KYRAX_NODE.x}
        y2={KYRAX_NODE.y}
        stroke="var(--color-bone-dim)"
        strokeWidth={1.25}
        strokeDasharray="3 5"
        opacity={0.4}
      />

      {/* The hub. */}
      <g>
        <circle cx={CX} cy={CY} r={7} fill="var(--color-blood-hot)" />
        <circle
          cx={CX}
          cy={CY}
          r={13}
          fill="none"
          stroke="var(--color-blood-hot)"
          strokeWidth={1}
          opacity={0.4}
        />
        <text
          x={CX}
          y={CY + 32}
          textAnchor="middle"
          className="fill-bone font-mono text-[13px] tracking-[0.2em]"
        >
          PULSE
        </text>
      </g>

      {/* The five divisions. */}
      {NODES.map((node) => {
        const division = DIVISION_BY_ID[node.id];
        const later = node.id === "kyrax";
        return (
          <g
            key={node.id}
            data-node
            style={{
              opacity: 0,
              transform: `scale(0.6)`,
              transformOrigin: `${node.x}px ${node.y}px`,
            }}
          >
            <circle
              cx={node.x}
              cy={node.y}
              r={9}
              fill={division.accent}
              opacity={later ? 0.5 : 1}
            />
            <text
              x={node.x}
              y={node.y - 18}
              textAnchor="middle"
              className={[
                "font-mono text-[11px] tracking-[0.16em]",
                later ? "fill-bone-dim" : "fill-bone",
              ].join(" ")}
            >
              {division.tab}
            </text>
            {later && (
              <text
                x={node.x}
                y={node.y + 24}
                textAnchor="middle"
                className="fill-bone-dim/60 font-mono text-[8px] tracking-[0.14em]"
              >
                LATER PHASE
              </text>
            )}
          </g>
        );
      })}
    </svg>
  );
}

/** Every division PULSE connects to, spelled out for the caption beneath it. */
export const POSITION_CAPTION_DIVISIONS = DIVISIONS.filter(
  (d) => d.id !== "pulse",
).map((d) => d.name);
