"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll-progress";

/**
 * THE DOLLY
 *
 * Art direction for the camera lives in Blender, not here. The scene exports
 * empties named cam_01…cam_n, each carrying a `look_at` point; this reads them
 * in order and runs the camera along them as the page scrolls, so re-framing a
 * chapter means moving an empty and re-exporting rather than editing numbers.
 *
 * The exported *rotations* are deliberately ignored. Blender's glTF exporter
 * converts node translations into Y-up but does not leave an empty's rotation
 * aiming where it did in the blend   measured at a consistent 90° off across
 * every stop. Aiming from the look_at point sidesteps that whole convention
 * problem, and interpolating the target keeps the subject centred through a
 * move rather than letting it drift as two quaternions slerp past each other.
 */

export interface CameraStop {
  name: string;
  position: THREE.Vector3;
  target: THREE.Vector3;
}

/** Blender is Z-up, glTF/three is Y-up: (x, y, z) → (x, z, -y). */
function blenderToThree(v: number[]): THREE.Vector3 {
  return new THREE.Vector3(v[0], v[2], -v[1]);
}

/**
 * Pulls the cam_* nodes out of a loaded glTF scene, in name order.
 * Node translations arrive already converted; `look_at` extras do not.
 */
export function readCameraStops(root: THREE.Object3D): CameraStop[] {
  const stops: CameraStop[] = [];

  root.traverse((child) => {
    if (!/^cam_\d+/.test(child.name)) return;

    const lookAt = (child.userData as { look_at?: number[] })?.look_at;
    if (!Array.isArray(lookAt) || lookAt.length !== 3) return;

    child.updateWorldMatrix(true, false);
    const position = new THREE.Vector3().setFromMatrixPosition(child.matrixWorld);

    stops.push({
      name: child.name,
      position,
      target: blenderToThree(lookAt),
    });
  });

  return stops.sort((a, b) => a.name.localeCompare(b.name));
}

/** Smoothstep, so each chapter settles rather than arriving at constant speed. */
function ease(t: number) {
  return t * t * (3 - 2 * t);
}

export function CameraDolly({
  stops,
  /** Ignore scroll and park on this stop. Used under reduced motion. */
  staticStop,
  /** How hard the camera resists the scroll position. Higher is tighter. */
  damping = 3.2,
}: {
  stops: CameraStop[];
  staticStop?: number;
  damping?: number;
}) {
  const desired = useMemo(
    () => ({ position: new THREE.Vector3(), target: new THREE.Vector3() }),
    [],
  );
  const aim = useRef(new THREE.Vector3());
  const started = useRef(false);

  useFrame((state, delta) => {
    if (stops.length === 0) return;
    const camera = state.camera;

    if (staticStop !== undefined) {
      const stop = stops[Math.min(staticStop, stops.length - 1)];
      camera.position.copy(stop.position);
      camera.lookAt(stop.target);
      return;
    }

    // Walk the scroll position along the chain of stops.
    const span = stops.length - 1;
    const scaled = scrollProgress.value * span;
    const index = Math.min(Math.floor(scaled), span - 1);
    const t = ease(scaled - index);

    const from = stops[index];
    const to = stops[index + 1];

    desired.position.copy(from.position).lerp(to.position, t);
    desired.target.copy(from.target).lerp(to.target, t);

    if (!started.current) {
      // Land on the first frame rather than swooping in from the origin.
      camera.position.copy(desired.position);
      aim.current.copy(desired.target);
      started.current = true;
    } else {
      // Damped follow gives the rig weight   the room is never in a hurry.
      const k = 1 - Math.exp(-damping * delta);
      camera.position.lerp(desired.position, k);
      aim.current.lerp(desired.target, k);
    }

    camera.lookAt(aim.current);
  });

  return null;
}
