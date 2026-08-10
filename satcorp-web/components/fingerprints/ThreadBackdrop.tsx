"use client";

import { usePathname } from "next/navigation";
import { Stage } from "@/components/system/Stage";
import { RedThread } from "./RedThread";
import { divisionFromPath } from "@/lib/divisions";
import { useUI } from "@/lib/store";

/**
 * The ambient pass of the red thread: a single filament running behind every
 * page, tying the six establishments together before any of their own 3D
 * worlds load. Each division routes it differently, so it reads as native to
 * the room while remaining recognisably the same thread.
 *
 * During a case-file transition it retracts, then draws itself back in — the
 * thread is what pulls you between establishments.
 */

const ROUTING: Record<string, [number, number, number][]> = {
  // A taut line across an evidence board.
  satcorp: [
    [-8, -2.2, -1],
    [-3.2, 1.1, 0.2],
    [0.4, -1.6, -0.4],
    [4.2, 1.4, 0.3],
    [8, -2, -1],
  ],
  // The slack of a desk-lamp cord.
  anu: [
    [-8, 2.4, -1.5],
    [-3, 1.2, -0.4],
    [0, -1.9, 0.2],
    [3.4, -2.6, -0.3],
    [8, -3.4, -1.2],
  ],
  // A synapse arcing between two nodes.
  kyrax: [
    [-8, 0.2, -1],
    [-3.6, 2.3, 0.6],
    [0, 0.1, -0.8],
    [3.6, -2.2, 0.6],
    [8, 0.1, -1],
  ],
  // Film leader running off the reel.
  kira: [
    [-8, -2.8, -1],
    [-2.6, -2.2, 0.3],
    [1.2, -1.4, -0.2],
    [4.6, 0.4, 0.4],
    [8, 2.6, -1],
  ],
  // A low orbit line.
  namtar: [
    [-8, -3.2, -1.5],
    [-3.4, -0.6, 0.4],
    [0, 0.6, 0.8],
    [3.4, -0.6, 0.4],
    [8, -3.2, -1.5],
  ],
  // A heartbeat.
  pulse: [
    [-8, 0, -0.5],
    [-2.4, 0, -0.5],
    [-1.4, 2.8, 0],
    [-0.6, -2.6, 0],
    [0.4, 0.4, 0],
    [2.6, 0, -0.5],
    [8, 0, -0.5],
  ],
};

/**
 * Establishments whose own 3D world already carries the thread in a native
 * form. Running the ambient pass as well would mean two threads and two WebGL
 * contexts on one page.
 */
const OWNS_ITS_THREAD = new Set(["anu", "kyrax", "kira", "namtar"]);

export function ThreadBackdrop() {
  const pathname = usePathname();
  const division = divisionFromPath(pathname);
  const phase = useUI((s) => s.phase);

  const points = ROUTING[division.id] ?? ROUTING.satcorp;
  const isPulse = division.id === "pulse";

  // ANU's thread is the lamp cord, KYRAX's a cross-reference through the
  // archive, Ki-Ra's the film leader running out of the gate, NAMTAR's an
  // orbit line around the planet. Each lives inside its own scene.
  if (OWNS_ITS_THREAD.has(division.id)) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 opacity-70"
      // Remounting per division rebuilds the curve cleanly rather than
      // interpolating between two unrelated routings.
      key={division.id}
    >
      <Stage animated interactive={false}>
        <RedThread
          points={points}
          progress={phase === "out" ? 0 : 1}
          radius={isPulse ? 0.016 : 0.022}
          speed={isPulse ? 0.4 : 0.16}
          wave={isPulse ? 0.02 : 0.07}
          intensity={division.id === "kyrax" ? 0.75 : 1}
        />
      </Stage>
    </div>
  );
}
