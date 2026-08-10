"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { MONOGRAM_STROKES, sampleStrokePoints } from "@/lib/sample-shape";
import { mulberry32 } from "@/lib/rng";

/**
 * THE LOGO REVEAL
 *
 * The monogram assembles out of drifting embers. Particles start scattered on
 * a sphere and are pulled to positions sampled from the real monogram artwork,
 * each on its own staggered schedule, so the mark resolves rather than snaps.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uSize;
  uniform float uDpr;

  attribute vec3  aScatter;
  attribute float aSeed;

  varying float vSeed;
  varying float vSettled;

  void main() {
    // Each particle arrives on its own schedule; the last land ~35% late.
    float stagger = aSeed * 0.35;
    float t = clamp((uProgress - stagger) / (1.0 - stagger), 0.0, 1.0);
    // Ease out quint — fast approach, long settle.
    float e = 1.0 - pow(1.0 - t, 5.0);

    // Embers drift while they are still loose, and go still once placed.
    vec3 drift = vec3(
      sin(uTime * 0.6 + aSeed * 34.0),
      cos(uTime * 0.5 + aSeed * 51.0),
      sin(uTime * 0.4 + aSeed * 17.0)
    ) * 0.22 * (1.0 - e);

    vec3 pos = mix(aScatter, position, e) + drift;

    // A breath of life once settled, so the mark never looks like a still.
    pos.z += sin(uTime * 0.8 + aSeed * 20.0) * 0.012 * e;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uDpr * (1.0 + aSeed * 0.8) * (3.0 / -mv.z);

    vSeed = aSeed;
    vSettled = e;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uEmber;
  uniform vec3 uBone;

  varying float vSeed;
  varying float vSettled;

  void main() {
    // Round, soft-edged points.
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.05, d);

    // Loose particles read as embers; settled ones cool toward bone.
    vec3 color = mix(uEmber, uBone, vSettled * (0.35 + vSeed * 0.65));
    float alpha = falloff * (0.35 + vSettled * 0.65);

    gl_FragColor = vec4(color, alpha);
  }
`;

export function ParticleMonogram({
  count = 14000,
  scale = 1.6,
  /** Seconds the mark takes to assemble. */
  duration = 2.4,
  dpr = 1.5,
}: {
  count?: number;
  scale?: number;
  duration?: number;
  dpr?: number;
}) {
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const elapsed = useRef(0);

  const geometry = useMemo(() => {
    // Seeded, so the mark assembles identically on every visit.
    const rng = mulberry32(0x5a7c04b);
    const targets = sampleStrokePoints(MONOGRAM_STROKES, count, rng);
    const scatter = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Start on a loose shell around the mark.
      const theta = rng() * Math.PI * 2;
      const phi = Math.acos(2 * rng() - 1);
      const radius = 2.2 + rng() * 2.6;
      scatter[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      scatter[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      scatter[i * 3 + 2] = Math.cos(phi) * radius * 0.6;
      seeds[i] = rng();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(targets, 3));
    geo.setAttribute("aScatter", new THREE.BufferAttribute(scatter, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    // Points never leave the shell radius, so a hand-set sphere beats
    // recomputing bounds every frame.
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 5);
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uSize: { value: 2.4 },
      uDpr: { value: dpr },
      uEmber: { value: new THREE.Color("#ff3b2f") },
      uBone: { value: new THREE.Color("#e9e1d3") },
    }),
    // Built once; pushed imperatively below.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    const material = materialRef.current;
    if (!material) return;
    elapsed.current += delta;
    material.uniforms.uTime.value = elapsed.current;
    material.uniforms.uProgress.value = Math.min(
      elapsed.current / duration,
      1,
    );
    material.uniforms.uDpr.value = dpr;
  });

  return (
    <points geometry={geometry} scale={scale}>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
