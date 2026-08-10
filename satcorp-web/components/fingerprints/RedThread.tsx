"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/**
 * FINGERPRINT 2.3 — THE RED THREAD
 *
 * The one object that appears in every establishment. It is drawn as a glowing
 * filament with a pulse travelling along it, and takes a form native to
 * whichever world it is placed in: a network edge on SATCORP, a lamp cord in
 * ANU's study, a synapse in KYRAX, an orbit line on NAMTAR, an EKG trace on
 * PULSE, film leader in the Ki-Ra screening room.
 *
 * `progress` doubles as the loading indicator — the thread draws itself.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uWave;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vec3 p = position;
    // Idle drift, so the thread never reads as a static tube.
    p.y += sin(p.x * 0.6 + uTime * 0.5) * uWave;
    p.z += cos(p.x * 0.4 + uTime * 0.35) * uWave * 0.6;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSpeed;
  uniform float uIntensity;
  uniform vec3  uColor;
  varying vec2 vUv;

  void main() {
    // vUv.x runs the length of the tube, vUv.y around its circumference.
    // Falling off toward the seam gives a soft filament rather than a pipe.
    float body = pow(sin(vUv.y * 3.14159265), 1.6);

    // The thread draws itself up to uProgress.
    float drawn = smoothstep(uProgress, uProgress - 0.03, vUv.x);

    // A pulse travelling the length, plus a fainter one trailing behind it.
    float head  = fract(uTime * uSpeed);
    float trail = fract(uTime * uSpeed - 0.18);
    float pulse =
      exp(-pow((vUv.x - head)  * 14.0, 2.0)) +
      exp(-pow((vUv.x - trail) * 20.0, 2.0)) * 0.35;

    float glow = (0.28 + pulse * 1.8) * uIntensity;
    float alpha = drawn * body * (0.42 + pulse * 1.2);

    gl_FragColor = vec4(uColor * glow, alpha);
  }
`;

export interface RedThreadProps {
  /** Control points the thread is routed through, in world units. */
  points?: [number, number, number][];
  radius?: number;
  /** 0 draws nothing, 1 draws the whole length. */
  progress?: number;
  /** Pulse travel speed, in lengths per second. */
  speed?: number;
  intensity?: number;
  /** Amplitude of the idle drift. Set 0 for a thread pulled taut. */
  wave?: number;
  color?: string;
  tubularSegments?: number;
}

const DEFAULT_POINTS: [number, number, number][] = [
  [-7, -1.4, -1],
  [-3.5, 0.9, 0.4],
  [0, -0.5, -0.3],
  [3.5, 1.1, 0.5],
  [7, -1.2, -1],
];

export function RedThread({
  points = DEFAULT_POINTS,
  radius = 0.02,
  progress = 1,
  speed = 0.16,
  intensity = 1,
  wave = 0.06,
  color = "#a6192e",
  tubularSegments = 220,
}: RedThreadProps) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const geometry = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3(
      points.map((p) => new THREE.Vector3(...p)),
      false,
      "catmullrom",
      0.4,
    );
    return new THREE.TubeGeometry(curve, tubularSegments, radius, 8, false);
  }, [points, radius, tubularSegments]);

  // R3F only disposes what it created, so geometry built here is our problem.
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: progress },
      uSpeed: { value: speed },
      uIntensity: { value: intensity },
      uWave: { value: wave },
      uColor: { value: new THREE.Color(color) },
    }),
    // Built once; values below are pushed imperatively each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    material.uniforms.uTime.value += delta;
    // Ease toward the target so a progress change reads as the thread being
    // drawn rather than snapping into place.
    material.uniforms.uProgress.value = THREE.MathUtils.damp(
      material.uniforms.uProgress.value,
      progress,
      4,
      delta,
    );
    material.uniforms.uIntensity.value = intensity;
    material.uniforms.uSpeed.value = speed;
    material.uniforms.uWave.value = wave;
  });

  return (
    <mesh geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}
