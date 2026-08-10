"use client";

import { Suspense, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { AdaptiveDpr, PerformanceMonitor } from "@react-three/drei";
import { useCapabilities, type Tier } from "@/lib/tier";
import { useHydrated } from "@/lib/store";

interface StageProps {
  children: ReactNode;
  /** Rendered instead of the canvas on lite-tier devices. */
  fallback?: ReactNode;
  /** Lowest tier that still gets a live canvas. */
  minTier?: Exclude<Tier, "lite">;
  className?: string;
  camera?: {
    position?: [number, number, number];
    fov?: number;
    /** Raise for worlds with a real horizon; the default suits a room. */
    near?: number;
    far?: number;
  };
  /** Set false for scenes that only redraw on demand. */
  animated?: boolean;
  transparent?: boolean;
  /**
   * Whether the canvas should receive pointer events. R3F puts
   * `pointer-events: auto` on its own container, which silently overrides a
   * `pointer-events-none` class on any wrapper — so ambient backdrops must
   * turn it off here rather than outside.
   */
  interactive?: boolean;
}

const TIER_ORDER: Record<Tier, number> = { lite: 0, standard: 1, full: 2 };

/**
 * The one place a WebGL context is created.
 *
 * Handles the three things every world needs and none of them should
 * reimplement: client-only mounting, tier gating with a real fallback, and a
 * pixel-ratio ceiling that drops itself under sustained load.
 */
export function Stage({
  children,
  fallback = null,
  minTier = "standard",
  className,
  camera,
  animated = true,
  transparent = true,
  interactive = true,
}: StageProps) {
  const caps = useCapabilities();
  const hydrated = useHydrated();

  // Server and first client render must agree, so nothing draws until hydrated.
  if (!hydrated) return <>{fallback}</>;
  if (TIER_ORDER[caps.tier] < TIER_ORDER[minTier]) return <>{fallback}</>;

  return (
    <Canvas
      className={className}
      style={interactive ? undefined : { pointerEvents: "none" }}
      dpr={[1, caps.maxDpr]}
      frameloop={animated ? "always" : "demand"}
      gl={{
        alpha: transparent,
        antialias: caps.tier === "full",
        powerPreference: "high-performance",
      }}
      camera={{
        position: camera?.position ?? [0, 0, 6],
        fov: camera?.fov ?? 45,
        near: camera?.near ?? 0.1,
        far: camera?.far ?? 200,
      }}
    >
      {/* Watches sustained frame rate and lowers the DPR ceiling before the
          page ever feels sluggish. */}
      <PerformanceMonitor />
      <AdaptiveDpr />
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  );
}
