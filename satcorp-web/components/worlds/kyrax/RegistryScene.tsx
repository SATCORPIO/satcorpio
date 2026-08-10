"use client";

import { Stage } from "@/components/system/Stage";
import { RedThread } from "@/components/fingerprints/RedThread";
import { HorizontalFov } from "@/components/system/HorizontalFov";
import { useCapabilities, useReducedMotion } from "@/lib/tier";
import { useDocumentScrollProgress } from "@/lib/scroll-progress";
import { Registry } from "./Registry";

/**
 * The archive sits behind the whole KYRAX page. Where ANU's camera moves
 * around a room you are visiting, this one travels forward through something
 * with no floor and no far wall   you are inside the index, and it goes on.
 */
export function RegistryScene() {
  const caps = useCapabilities();
  const reducedMotion = useReducedMotion();

  useDocumentScrollProgress(!reducedMotion);

  const count = caps.tier === "full" ? 9000 : 3600;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0">
      <Stage
        interactive={false}
        camera={{ position: [0, 0, 12], fov: 55 }}
        fallback={
          // Lite tier: the same cold field, suggested rather than simulated.
          <div className="size-full bg-[radial-gradient(ellipse_at_50%_40%,rgba(214,228,229,0.10),transparent_60%)]" />
        }
      >
        {/* Keep the depth of the archive consistent on any window shape. */}
        <HorizontalFov degrees={72} />

        <Registry count={count} />

        {/* Fingerprint 2.3   in an archive the red thread is a cross-reference:
            one length of it running the depth of the index, tying files
            together that nobody else thought to connect. */}
        <RedThread
          points={[
            [-6.5, 3.4, 15],
            [-1.8, -1.6, 4],
            [3.6, 2.5, -8],
            [-1.4, -3.1, -20],
            [4.8, 1.1, -33],
          ]}
          radius={0.03}
          speed={0.12}
          wave={0.05}
          intensity={1.15}
        />
      </Stage>

      {/* The writing runs down the left, so the scrim is weighted left  
          a radial vignette would have been darkest exactly where the text
          isn't. The archive stays legible on the right. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/78 to-ink/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-transparent to-ink/80" />
    </div>
  );
}
