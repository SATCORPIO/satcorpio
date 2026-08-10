"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { RedThread } from "@/components/fingerprints/RedThread";
import { HorizontalFov } from "@/components/system/HorizontalFov";
import { CameraDolly, readCameraStops } from "./CameraDolly";

const MODEL = "/models/anu-desk.glb";

/**
 * ANU'S STUDY
 *
 * The desk scene, lit the way the room is written: one warm source under the
 * lamp shade, a cold rim from somewhere off to the right, and almost nothing
 * else. Everything past the pool of light is allowed to fall away.
 *
 * Blender is Z-up and glTF is Y-up, so a point authored at (x, y, z) in the
 * blend arrives here as (x, z, -y). The helper below does that conversion so
 * the numbers in this file can be read against the blend file directly.
 */

/** Blender-space coordinates → three-space. */
function fromBlender(x: number, y: number, z: number): [number, number, number] {
  return [x, z, -y];
}

const LAMP = { x: -0.58, y: 0.24 };
const DESK_TOP = 0.75;

export function DeskScene({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF(MODEL);

  // One instance is fine   this scene is mounted exactly once per page.
  const stops = useMemo(() => readCameraStops(scene), [scene]);

  // A rig with no stops fails silently as a camera that never moves, which is
  // easy to mistake for a scroll problem. Say so instead.
  useEffect(() => {
    if (stops.length < 2) {
      console.warn(
        `[ANU] Expected camera stops named cam_01… with a look_at extra in ${MODEL}; found ${stops.length}. The dolly will not move.`,
      );
    }
  }, [stops]);

  useEffect(() => {
    scene.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      // The desk and its contents both cast and catch light.
      child.castShadow = true;
      child.receiveShadow = true;
      const material = child.material as THREE.MeshStandardMaterial;
      if (material?.name === "Floor_Dark") {
        child.castShadow = false;
      }
    });
  }, [scene]);

  return (
    <>
      <primitive object={scene} />

      {/* The stops were framed in Blender against a landscape render at a
          ~48° horizontal angle. Hold that, whatever shape the window is. */}
      <HorizontalFov degrees={50} />

      <CameraDolly stops={stops} staticStop={reducedMotion ? 0 : undefined} />

      {/* The lamp: the only source that matters. */}
      <pointLight
        position={fromBlender(LAMP.x, LAMP.y, DESK_TOP + 0.225)}
        intensity={2.4}
        distance={4.5}
        decay={2}
        color="#ffcf96"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0008}
      />
      {/* A little green bounce from inside the shade. */}
      <pointLight
        position={fromBlender(LAMP.x, LAMP.y, DESK_TOP + 0.30)}
        intensity={0.35}
        distance={1.4}
        decay={2}
        color="#5fd6a0"
      />
      {/* Cold rim, so the far edge of the desk does not vanish entirely. */}
      <pointLight
        position={fromBlender(1.9, 1.4, 1.8)}
        intensity={1.1}
        distance={7}
        decay={2}
        color="#6f86c9"
      />
      <ambientLight intensity={0.06} color="#b8a68c" />

      {/* Fingerprint 2.3   on this page the red thread is the lamp's cord,
          running off the back of the desk and down into the dark. */}
      <RedThread
        points={[
          fromBlender(LAMP.x, LAMP.y, DESK_TOP + 0.012),
          fromBlender(LAMP.x - 0.05, LAMP.y + 0.20, DESK_TOP + 0.004),
          fromBlender(LAMP.x - 0.09, LAMP.y + 0.42, DESK_TOP - 0.06),
          fromBlender(LAMP.x - 0.12, LAMP.y + 0.46, 0.42),
          fromBlender(LAMP.x - 0.16, LAMP.y + 0.40, 0.06),
          fromBlender(LAMP.x - 0.30, LAMP.y + 0.22, 0.012),
        ]}
        radius={0.005}
        tubularSegments={140}
        wave={0}
        speed={0.09}
        intensity={0.9}
      />
    </>
  );
}

useGLTF.preload(MODEL);
