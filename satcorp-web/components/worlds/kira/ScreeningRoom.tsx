"use client";

import { Stage } from "@/components/system/Stage";
import { HorizontalFov } from "@/components/system/HorizontalFov";
import { RedThread } from "@/components/fingerprints/RedThread";
import { useCapabilities } from "@/lib/tier";
import { ProjectionRoom } from "./ProjectionRoom";

/**
 * Unlike ANU and KYRAX, Ki-Ra's world is not a fixed backdrop running the
 * length of the page. It is the hero and only the hero: the lights go down for
 * the screening, then they come up and you read the programme. Three pages,
 * three different relationships between the writing and the room.
 */
export function ScreeningRoom() {
  const caps = useCapabilities();
  const dustCount = caps.tier === "full" ? 7000 : 2600;

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <Stage
        interactive={false}
        camera={{ position: [-6.4, 1.25, 5.6], fov: 46 }}
        fallback={
          <div className="size-full bg-[radial-gradient(ellipse_at_50%_45%,rgba(159,212,205,0.13),transparent_62%)]" />
        }
      >
        <HorizontalFov degrees={68} />
        <ProjectionRoom dustCount={dustCount} />

        {/* Fingerprint 2.3   here the thread is film leader, running out of
            the gate and away along the bottom of frame. */}
        <RedThread
          points={[
            [-9, -3.4, 6.5],
            [-3.6, -2.9, 3.2],
            [0.6, -3.2, 0.4],
            [4.4, -2.6, -2.6],
            [9, -3.5, -6],
          ]}
          radius={0.028}
          speed={0.22}
          wave={0.03}
          intensity={1.0}
        />
      </Stage>

      {/* The programme text runs down the left, so the room is held back
          hardest there and allowed to burn on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/88 via-ink/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-ink via-ink/70 to-transparent" />
      <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink to-transparent" />
    </div>
  );
}
