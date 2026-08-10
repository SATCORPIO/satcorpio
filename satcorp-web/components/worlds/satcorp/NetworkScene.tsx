"use client";

import { useState } from "react";
import { Stage } from "@/components/system/Stage";
import { useConciergeNav } from "@/components/fingerprints/CaseFileTransition";
import { DIVISION_BY_ID, type DivisionId } from "@/lib/divisions";
import { NetworkBoard } from "./NetworkBoard";

/**
 * Mounts the board and shows the dossier line for whichever pin is under the
 * pointer. Clicking a pin takes the case-file transition to that division.
 */
export function NetworkScene() {
  const navigate = useConciergeNav();
  const [hovered, setHovered] = useState<DivisionId | null>(null);
  const division = hovered ? DIVISION_BY_ID[hovered] : null;

  return (
    <div className="relative h-[58vh] min-h-[380px] w-full sm:h-[64vh]">
      <Stage camera={{ position: [0, 0, 7.4], fov: 42 }}>
        <NetworkBoard
          onSelect={(id) => navigate(DIVISION_BY_ID[id].href)}
          onHover={setHovered}
        />
      </Stage>

      {/* Readout. Aria-hidden: the board is decorative and the same
          information is in the division list below. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex flex-col items-center gap-1.5 pb-2"
      >
        <p
          className="font-display text-2xl text-bone transition-opacity duration-300"
          style={{ opacity: division ? 1 : 0 }}
        >
          {division?.name ?? " "}
        </p>
        <p className="label text-[0.55rem] transition-opacity duration-300">
          {division ? division.role : "Drag the board   pins are live"}
        </p>
      </div>
    </div>
  );
}
