"use client";

import { Stage } from "@/components/system/Stage";
import { Monogram } from "@/components/fingerprints/Monogram";
import { useCapabilities } from "@/lib/tier";
import { ParticleMonogram } from "./ParticleMonogram";

/**
 * The hero mark. On lite tier this is simply the monogram — same artwork, no
 * canvas, no cost. Everywhere else it assembles from embers.
 *
 * The caller owns positioning and size. Nothing is hardcoded here: Tailwind
 * emits `.relative` after `.absolute`, so a baked-in `relative` would quietly
 * beat any positioning passed in and collapse the canvas to content size.
 */
export function HeroMark({ className = "" }: { className?: string }) {
  const caps = useCapabilities();
  const count = caps.tier === "full" ? 30000 : 12000;

  return (
    <div className={className} aria-hidden>
      <Stage
        interactive={false}
        camera={{ position: [0, 0, 5], fov: 40 }}
        fallback={
          <div className="grid size-full place-items-center">
            <Monogram className="size-14 text-blood" />
          </div>
        }
      >
        <ParticleMonogram count={count} dpr={caps.maxDpr} />
      </Stage>
    </div>
  );
}
