"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stage } from "@/components/system/Stage";
import { Placeholder } from "@/components/system/Placeholder";
import { sampleStrokePoints, type StrokeSpec } from "@/lib/sample-shape";
import { mulberry32 } from "@/lib/rng";
import { useCapabilities } from "@/lib/tier";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * THE CONSCIOUSNESS SYSTEM
 *
 * The signature section: a wireframe body comes apart into particles and
 * reassembles as a robotic frame, scrubbed by the reader's own scroll — the
 * transfer happens at the speed they choose to read about it.
 *
 * Two point clouds sampled from the same stroke artwork, one shader
 * interpolating between them. No skinned mesh, no animation clip, no asset:
 * the whole sequence is two SVGs and a mix().
 */

/**
 * A person, drawn as strokes against a 0 0 100 100 box.
 *
 * Strokes are wide and overlapping rather than thin: the cloud is sampled from
 * the ink, so anything drawn as an outline comes out hollow. These are meant
 * to read as a body with mass, not a stick figure.
 */
const BODY_STROKES: StrokeSpec[] = [
  { d: "M50 11 m -3.5 0 a 3.5 4.5 0 1 0 7 0 a 3.5 4.5 0 1 0 -7 0", width: 9 },
  { d: "M50 18 L50 22", width: 6 },
  { d: "M44 24 L56 24 L54 50 L46 50 Z", width: 11 },
  { d: "M41 27 L34 42 L31 58", width: 7 },
  { d: "M59 27 L66 42 L69 58", width: 7 },
  { d: "M47 50 L44 72 L42 93", width: 9 },
  { d: "M53 50 L56 72 L58 93", width: 9 },
];

/** The frame it wakes up in. Same proportions, nothing organic left. */
const FRAME_STROKES: StrokeSpec[] = [
  { d: "M43 5 L57 5 L57 17 L43 17 Z", width: 10 },
  { d: "M40 22 L60 22 L62 51 L38 51 Z", width: 12 },
  { d: "M39 25 L27 42 L25 60", width: 9 },
  { d: "M61 25 L73 42 L75 60", width: 9 },
  { d: "M27 42 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", width: 7 },
  { d: "M73 42 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", width: 7 },
  { d: "M44 51 L41 72 L38 94", width: 11 },
  { d: "M56 51 L59 72 L62 94", width: 11 },
  { d: "M41 72 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", width: 8 },
  { d: "M59 72 m -2 0 a 2 2 0 1 0 4 0 a 2 2 0 1 0 -4 0", width: 8 },
];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uDpr;

  attribute vec3  aFrame;
  attribute vec3  aDrift;
  attribute float aSeed;

  varying float vSeed;
  varying float vMix;
  varying float vLoose;

  const float PI = 3.14159265;

  void main() {
    // Each particle leaves on its own schedule. The transfer is a process,
    // not a switch.
    float stagger = aSeed * 0.42;
    float m = clamp((uMorph - stagger) / (1.0 - stagger), 0.0, 1.0);
    float e = m * m * (3.0 - 2.0 * m);

    vec3 pos = mix(position, aFrame, e);

    // Everything blows outward at the halfway point and is drawn back in —
    // for a moment there is no body at all, which is the idea.
    float loose = sin(e * PI);
    pos += aDrift * loose * 0.62;

    // Never entirely still, at either end.
    pos += vec3(
      sin(uTime * 0.7 + aSeed * 30.0),
      cos(uTime * 0.6 + aSeed * 44.0),
      sin(uTime * 0.5 + aSeed * 19.0)
    ) * 0.012;

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uDpr * (0.7 + aSeed * 0.8) * (3.0 / -mv.z);

    vSeed = aSeed;
    vMix = e;
    vLoose = loose;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uBone;
  uniform vec3 uAccent;
  uniform vec3 uSpark;

  varying float vSeed;
  varying float vMix;
  varying float vLoose;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.05, d);

    // Bone while it is a body, amber once it is a frame, hot in transit.
    vec3 color = mix(uBone, uAccent, vMix);
    color = mix(color, uSpark, vLoose * 0.75);

    float alpha = falloff * (0.30 + vSeed * 0.45 + vLoose * 0.45);
    gl_FragColor = vec4(color, alpha);
  }
`;

function Transfer({
  count,
  progress,
  dpr,
}: {
  count: number;
  progress: React.RefObject<number>;
  dpr: number;
}) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const shown = useRef(0);

  const geometry = useMemo(() => {
    const rng = mulberry32(0x2c8f11);
    const body = sampleStrokePoints(BODY_STROKES, count, rng);
    // A second generator, so adding a stroke to one figure does not reshuffle
    // the other one's sampling.
    const frame = sampleStrokePoints(FRAME_STROKES, count, mulberry32(0x71b3a4));
    const drift = new Float32Array(count * 3);
    const seeds = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const theta = rng() * Math.PI * 2;
      const z = rng() * 2 - 1;
      const r = Math.sqrt(1 - z * z);
      drift[i * 3] = Math.cos(theta) * r;
      drift[i * 3 + 1] = z;
      drift[i * 3 + 2] = Math.sin(theta) * r * 0.6;
      seeds[i] = rng();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(body, 3));
    geo.setAttribute("aFrame", new THREE.BufferAttribute(frame, 3));
    geo.setAttribute("aDrift", new THREE.BufferAttribute(drift, 3));
    geo.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geo.boundingSphere = new THREE.Sphere(new THREE.Vector3(), 3);
    return geo;
  }, [count]);

  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uSize: { value: 2.2 },
      uDpr: { value: dpr },
      uBone: { value: new THREE.Color("#e9e1d3") },
      uAccent: { value: new THREE.Color("#d97e2f") },
      uSpark: { value: new THREE.Color("#ffd9a0") },
    }),
    [dpr],
  );

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;
    m.uniforms.uTime.value += delta;
    // Damped rather than driven directly: a trackpad flick would otherwise
    // fire the whole transfer in three frames.
    shown.current = THREE.MathUtils.damp(
      shown.current,
      progress.current,
      6,
      delta,
    );
    m.uniforms.uMorph.value = shown.current;
  });

  return (
    <points geometry={geometry} scale={1.85} position={[0, 0.08, 0]}>
      <shaderMaterial
        ref={material}
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

export function Consciousness({ className = "" }: { className?: string }) {
  const wrapper = useRef<HTMLDivElement>(null);
  const progress = useRef(0);
  const caps = useCapabilities();

  // Scrubbed against this section alone rather than the document: the
  // transfer belongs to the paragraph that describes it.
  useEffect(() => {
    const el = wrapper.current;
    if (!el) return;

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 78%",
      end: "bottom 42%",
      scrub: true,
      onUpdate: (self) => {
        progress.current = self.progress;
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div
      ref={wrapper}
      className={`aspect-[4/3] w-full ${className}`}
      aria-hidden
    >
      <Stage
        interactive={false}
        camera={{ position: [0, 0, 6.4], fov: 42 }}
        fallback={
          <Placeholder
            label="A wireframe body coming apart into particles and reassembling as a robotic frame."
            file="NM-200"
            aspect="4 / 3"
            stamp="SEQUENCE IN BUILD"
            tone="accent"
            className="size-full"
          />
        }
      >
        <Transfer
          count={caps.tier === "full" ? 12000 : 6000}
          progress={progress}
          dpr={caps.maxDpr}
        />
      </Stage>
    </div>
  );
}
