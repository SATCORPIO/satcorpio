"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Stage } from "@/components/system/Stage";
import { Placeholder } from "@/components/system/Placeholder";
import { sampleStrokeVolume, type StrokeSpec } from "@/lib/sample-shape";
import { mulberry32 } from "@/lib/rng";
import { useCapabilities } from "@/lib/tier";
import { ScrollTrigger } from "@/lib/gsap";

/**
 * THE CONSCIOUSNESS SYSTEM
 *
 * The signature section: a body comes apart into particles and reassembles as
 * a robotic frame, scrubbed by the reader's own scroll   the transfer happens
 * at the speed they choose to read about it.
 *
 * Two point clouds sampled from the same artwork, one shader interpolating
 * between them. No skinned mesh, no animation clip, no asset: the whole
 * sequence is two drawings and a mix().
 *
 * Both figures are sampled with `sampleStrokeVolume`, so each is a body with
 * depth rather than a decal, and the rig turns slowly enough that you can see
 * it. A flat cloud folded into a line the moment the figure was not dead-on,
 * which is what made the earlier version read as a sprite.
 */

/** A filled circle, as path data. Anatomy needs rather a lot of these. */
function disc(cx: number, cy: number, r: number): StrokeSpec {
  return {
    d: `M${cx - r} ${cy} a ${r} ${r} 0 1 0 ${r * 2} 0 a ${r} ${r} 0 1 0 ${-r * 2} 0 Z`,
    fill: true,
  };
}

/**
 * A person, drawn against a 0 0 100 100 box, standing, arms a little clear of
 * the body. Roughly six and a half heads tall.
 *
 * Masses that taper   skull, ribcage, pelvis, feet   are filled paths, because
 * an outline of a torso samples as a hollow shell. Limbs are round-capped
 * strokes, which is exactly a capsule and exactly what a limb is.
 */
const BODY_STROKES: StrokeSpec[] = [
  // Skull and jaw.
  { d: "M44.5 13 a 5.5 7 0 1 1 11 0 a 5.5 7 0 1 1 -11 0 Z", fill: true },
  { d: "M46.6 17 L53.4 17 L53.4 21 L46.6 21 Z", fill: true },
  // Neck.
  { d: "M50 20 L50 25", width: 6.4, cap: "round" },
  // Ribcage down to the hips: broad at the shoulders, drawn in at the waist.
  {
    d: "M38 26 L62 26 L63 36 L57.5 53 L58.5 62 L41.5 62 L42.5 53 L37 36 Z",
    fill: true,
  },
  // Deltoids.
  disc(38.5, 28.5, 4.2),
  disc(61.5, 28.5, 4.2),
  // Arms.
  { d: "M38 30 L33 45", width: 7.4, cap: "round" },
  { d: "M33 45 L31 59", width: 6, cap: "round" },
  disc(30.6, 62.5, 3.3),
  { d: "M62 30 L67 45", width: 7.4, cap: "round" },
  { d: "M67 45 L69 59", width: 6, cap: "round" },
  disc(69.4, 62.5, 3.3),
  // Legs.
  { d: "M45.2 61 L43.6 77", width: 10, cap: "round" },
  { d: "M43.6 77 L42.6 91", width: 7.6, cap: "round" },
  { d: "M38.2 92.5 L46.4 92.5 L46.4 96.5 L36.4 96.5 Z", fill: true },
  { d: "M54.8 61 L56.4 77", width: 10, cap: "round" },
  { d: "M56.4 77 L57.4 91", width: 7.6, cap: "round" },
  { d: "M53.6 92.5 L61.8 92.5 L63.6 96.5 L53.6 96.5 Z", fill: true },
];

/**
 * The frame it wakes up in.
 *
 * Deliberately the same skeleton at the same scale   the transfer only lands
 * if the reader can see the frame standing where the body stood. Everything
 * organic is replaced rather than removed: the skull becomes a sensor housing,
 * the ribcage a chassis, and the joints are exposed as actuators with real gaps
 * between the segments.
 */
const FRAME_STROKES: StrokeSpec[] = [
  // Sensor housing and visor.
  { d: "M44 6.5 L56 6.5 L57.2 15 L54 20 L46 20 L42.8 15 Z", fill: true },
  { d: "M44.6 10.5 L55.4 10.5 L55.4 14 L44.6 14 Z", fill: true },
  // Neck strut.
  { d: "M50 20.5 L50 25", width: 4.4 },
  // Chassis, pelvis block, and the spine that carries between them.
  { d: "M39 26 L61 26 L62.5 37 L58 50 L42 50 L37.5 37 Z", fill: true },
  { d: "M50 49 L50 56", width: 5.2 },
  { d: "M41.5 55 L58.5 55 L57.5 63 L42.5 63 Z", fill: true },
  // Shoulder actuators.
  disc(37.4, 28.5, 4.6),
  disc(62.6, 28.5, 4.6),
  // Arms, segmented at the elbow.
  { d: "M37 30 L32.4 43.5", width: 6.2 },
  disc(32, 45.6, 3.2),
  { d: "M32 47.8 L30.2 59.5", width: 5.2 },
  { d: "M27 61.5 L33.4 61.5 L34.2 67 L31.2 64.6 L28.4 67 Z", fill: true },
  { d: "M63 30 L67.6 43.5", width: 6.2 },
  disc(68, 45.6, 3.2),
  { d: "M68 47.8 L69.8 59.5", width: 5.2 },
  { d: "M66.6 61.5 L73 61.5 L71.6 67 L68.8 64.6 L65.8 67 Z", fill: true },
  // Legs, segmented at the knee.
  { d: "M45 63 L43.8 76", width: 8.6 },
  disc(43.6, 78, 3.6),
  { d: "M43.6 80 L42.8 90.5", width: 6.6 },
  { d: "M37.2 91.5 L47 91.5 L47 96.5 L35.4 96.5 Z", fill: true },
  { d: "M55 63 L56.2 76", width: 8.6 },
  disc(56.4, 78, 3.6),
  { d: "M56.4 80 L57.2 90.5", width: 6.6 },
  { d: "M53 91.5 L62.8 91.5 L64.6 96.5 L53 96.5 Z", fill: true },
];

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uSize;
  uniform float uDpr;
  uniform float uSpin;

  attribute vec3  aFrame;
  attribute vec3  aDrift;
  attribute float aSeed;

  varying float vSeed;
  varying float vMix;
  varying float vLoose;
  varying float vFront;

  const float PI = 3.14159265;

  void main() {
    // Each particle leaves on its own schedule. The transfer is a process,
    // not a switch.
    float stagger = aSeed * 0.42;
    float m = clamp((uMorph - stagger) / (1.0 - stagger), 0.0, 1.0);
    float e = m * m * (3.0 - 2.0 * m);

    vec3 pos = mix(position, aFrame, e);

    // Everything blows outward at the halfway point and is drawn back in
    // for a moment there is no body at all, which is the idea.
    float loose = sin(e * PI);
    pos += aDrift * loose * 0.62;

    // Never entirely still, at either end.
    pos += vec3(
      sin(uTime * 0.7 + aSeed * 30.0),
      cos(uTime * 0.6 + aSeed * 44.0),
      sin(uTime * 0.5 + aSeed * 19.0)
    ) * 0.012;

    // The turn happens here rather than on the object so that z after the
    // rotation is still the axis pointing at the camera   which is what makes
    // the front/back shading below possible at all.
    float s = sin(uSpin);
    float c = cos(uSpin);
    pos = vec3(pos.x * c + pos.z * s, pos.y, pos.z * c - pos.x * s);
    vFront = pos.z;

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
  varying float vFront;

  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float falloff = smoothstep(0.5, 0.05, d);

    // Bone while it is a body, amber once it is a frame, hot in transit.
    vec3 color = mix(uBone, uAccent, vMix);
    color = mix(color, uSpark, vLoose * 0.75);

    // The far side of the figure sits back. Without this the two shells read as
    // one bright sheet and the volume is thrown away.
    float front = smoothstep(-0.35, 0.35, vFront);
    float depthFade = mix(0.42, 1.0, front);

    float alpha = falloff * (0.30 + vSeed * 0.45 + vLoose * 0.45);
    gl_FragColor = vec4(color, alpha * mix(depthFade, 1.0, vLoose * 0.7));
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
    const body = sampleStrokeVolume(BODY_STROKES, count, rng, 0.66);
    // A second generator, so adding a stroke to one figure does not reshuffle
    // the other one's sampling. The chassis is flatter front-to-back than a
    // ribcage, hence the shallower depth.
    const frame = sampleStrokeVolume(
      FRAME_STROKES,
      count,
      mulberry32(0x71b3a4),
      0.54,
    );
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
      uSize: { value: 2.0 },
      uDpr: { value: dpr },
      uSpin: { value: 0 },
      uBone: { value: new THREE.Color("#e9e1d3") },
      uAccent: { value: new THREE.Color("#d97e2f") },
      uSpark: { value: new THREE.Color("#ffd9a0") },
    }),
    [dpr],
  );

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;
    const t = (m.uniforms.uTime.value += delta);
    // An easy turn back and forth rather than a full revolution: a figure this
    // flat goes edge-on at a quarter turn and disappears.
    m.uniforms.uSpin.value = Math.sin(t * 0.17) * 0.4;
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
    <points geometry={geometry} scale={1.85} position={[0, 0.05, 0]}>
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
            label="A human body coming apart into particles and reassembling as a robotic frame."
            file="NM-200"
            aspect="4 / 3"
            stamp="SEQUENCE IN BUILD"
            tone="accent"
            className="size-full"
          />
        }
      >
        <Transfer
          count={caps.tier === "full" ? 16000 : 8000}
          progress={progress}
          dpr={caps.maxDpr}
        />
      </Stage>
    </div>
  );
}
