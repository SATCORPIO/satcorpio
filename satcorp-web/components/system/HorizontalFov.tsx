"use client";

import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Locks the camera's *horizontal* field of view instead of its vertical one.
 *
 * three, like most engines, treats `fov` as vertical. Framings authored in
 * Blender against a landscape render therefore crop in hard as the viewport
 * gets narrower — on a square or portrait window the subject blows past the
 * edges of frame. Holding the horizontal angle fixed keeps the composition the
 * scene was art-directed for, and lets tall windows simply see more above and
 * below.
 *
 * Runs in the frame loop rather than an effect: useFrame callbacks execute
 * before the render, so the correction lands on the same frame and nothing
 * pops.
 */
export function HorizontalFov({
  degrees,
  min = 18,
  max = 84,
}: {
  degrees: number;
  min?: number;
  max?: number;
}) {
  useFrame((state) => {
    const camera = state.camera;
    if (!(camera instanceof THREE.PerspectiveCamera)) return;

    const aspect = state.size.width / state.size.height;
    if (!Number.isFinite(aspect) || aspect <= 0) return;

    const half = THREE.MathUtils.degToRad(degrees) / 2;
    const vertical = THREE.MathUtils.radToDeg(
      2 * Math.atan(Math.tan(half) / aspect),
    );
    const next = THREE.MathUtils.clamp(vertical, min, max);

    if (Math.abs(camera.fov - next) < 0.01) return;
    camera.fov = next;
    camera.updateProjectionMatrix();
  });

  return null;
}
