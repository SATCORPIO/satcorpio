"use client";

import { usePathname } from "next/navigation";
import { Stage } from "@/components/system/Stage";
import { RedThread } from "./RedThread";
import { divisionFromPath } from "@/lib/divisions";
import { useUI } from "@/lib/store";

/**
 * The ambient pass of the red thread: a single filament running behind the
 * page, tying the establishments together before any of their own 3D worlds
 * load. During a case-file transition it retracts, then draws itself back in
 * the thread is what pulls you between establishments.
 *
 * Every division except SATCORP now carries the thread inside its own scene,
 * in a form native to that world: the lamp cord in ANU's study, a
 * cross-reference through the KYRAX archive, film leader running out of the
 * gate at Ki-Ra, an orbit line around NAMTAR, and the EKG trace on PULSE.
 * Those routes are listed below and get nothing from here   running the
 * ambient pass as well would mean two threads and two WebGL contexts on one
 * page.
 *
 * What is left is SATCORP's own routing, which also serves every route that
 * resolves to it: the intake forms and the paperwork.
 */

/** A taut line across an evidence board. */
const SATCORP_ROUTING: [number, number, number][] = [
  [-8, -2.2, -1],
  [-3.2, 1.1, 0.2],
  [0.4, -1.6, -0.4],
  [4.2, 1.4, 0.3],
  [8, -2, -1],
];

const OWNS_ITS_THREAD = new Set(["anu", "kyrax", "kira", "namtar", "pulse"]);

export function ThreadBackdrop() {
  const pathname = usePathname();
  const division = divisionFromPath(pathname);
  const phase = useUI((s) => s.phase);

  if (OWNS_ITS_THREAD.has(division.id)) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 opacity-70">
      <Stage animated interactive={false}>
        <RedThread
          points={SATCORP_ROUTING}
          progress={phase === "out" ? 0 : 1}
          radius={0.022}
          speed={0.16}
          wave={0.07}
        />
      </Stage>
    </div>
  );
}
