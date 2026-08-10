"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { signal } from "./heartbeat";

/**
 * THE EKG TRACE
 *
 * PULSE's red thread, in this establishment's native form: a heartbeat. Where
 * every other route routes the shared `<RedThread>` through its own world, this
 * one is drawn from scratch, and the reason is geometric rather than stylistic.
 *
 * `RedThread` is a TubeGeometry swept along a fixed CatmullRom curve. A tube
 * displaced vertically keeps its cross-section perpendicular to X, so its
 * apparent thickness falls off as the slope steepens   and the R spike is very
 * nearly vertical. The trace would have thinned to nothing at exactly the point
 * the whole shape exists for.
 *
 * So this is a ribbon: two vertices per sample, offset along the *normal* of
 * the curve, which the vertex shader derives from the waveform's own slope.
 * Constant thickness at any gradient, and a third of the vertices of a tube.
 */

/* --- the waveform, in GLSL. Mirrors `beatAt` in heartbeat.ts. --- */
const BEAT = /* glsl */ `
  float gauss(float t, float centre, float width) {
    float d = (t - centre) * width;
    return exp(-d * d);
  }

  float beat(float p) {
    float t = fract(p);
    return
        0.10 * gauss(t, 0.160, 26.0)   // P wave
      - 0.16 * gauss(t, 0.300, 90.0)   // Q
      + 1.00 * gauss(t, 0.340, 80.0)   // R   the spike
      - 0.34 * gauss(t, 0.385, 70.0)   // S
      + 0.26 * gauss(t, 0.560, 18.0);  // T wave
  }
`;

const vertexShader = /* glsl */ `
  uniform float uSweep;
  uniform float uCycles;
  uniform float uAmp;
  uniform float uThickness;
  uniform float uHalfWidth;

  attribute float aT;
  attribute float aSide;

  varying float vSide;
  varying float vT;
  varying float vY;

  ${BEAT}

  float trace(float t) {
    return beat(t * uCycles - uSweep) * uAmp;
  }

  void main() {
    float x = mix(-uHalfWidth, uHalfWidth, aT);
    float y = trace(aT);

    // The ribbon is offset along the curve's normal rather than straight up,
    // which is the whole point of drawing it this way   sample one step along
    // and take the perpendicular.
    float e = 0.0012;
    float dx = 2.0 * uHalfWidth * e;
    float dy = trace(aT + e) - y;
    vec2 tangent = normalize(vec2(dx, dy));
    vec2 normal = vec2(-tangent.y, tangent.x);

    vec3 p = vec3(x, y, 0.0) + vec3(normal * aSide * uThickness, 0.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);

    vSide = aSide;
    vT = aT;
    vY = y / max(uAmp, 0.0001);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uColor;
  uniform vec3  uHot;
  uniform float uSurge;
  uniform float uOpacity;

  varying float vSide;
  varying float vT;
  varying float vY;

  void main() {
    // Soft across the ribbon, so it reads as a filament rather than a tape.
    float body = pow(1.0 - abs(vSide), 1.5);

    // The spike flares. Everything is calmer between beats, which is what makes
    // the beat land.
    float energy = clamp(abs(vY) * 1.5, 0.0, 1.0);

    // Faded at both ends so the trace enters and leaves frame instead of being
    // guillotined by the viewport edge.
    float edge = smoothstep(0.0, 0.07, vT) * smoothstep(1.0, 0.93, vT);

    vec3 color = mix(uColor, uHot, clamp(energy * 0.85 + uSurge * 0.3, 0.0, 1.0));
    float alpha = body * edge * (0.26 + energy * 0.95 + uSurge * 0.3) * uOpacity;

    gl_FragColor = vec4(color * (0.85 + energy * 2.3), alpha);
  }
`;

/** Two vertices per sample, offset either side of the curve in the shader. */
function buildRibbon(segments: number): THREE.BufferGeometry {
  const count = segments + 1;
  const position = new Float32Array(count * 2 * 3);
  const aT = new Float32Array(count * 2);
  const aSide = new Float32Array(count * 2);
  const indices = new Uint32Array(segments * 6);

  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    aT[i * 2] = t;
    aT[i * 2 + 1] = t;
    aSide[i * 2] = -1;
    aSide[i * 2 + 1] = 1;

    if (i < segments) {
      const o = i * 6;
      const a = i * 2;
      indices[o] = a;
      indices[o + 1] = a + 1;
      indices[o + 2] = a + 2;
      indices[o + 3] = a + 1;
      indices[o + 4] = a + 3;
      indices[o + 5] = a + 2;
    }
  }

  const geo = new THREE.BufferGeometry();
  // Every real position is computed in the shader; this exists so three has an
  // attribute of the right length to work from.
  geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
  geo.setAttribute("aT", new THREE.BufferAttribute(aT, 1));
  geo.setAttribute("aSide", new THREE.BufferAttribute(aSide, 1));
  geo.setIndex(new THREE.BufferAttribute(indices, 1));
  return geo;
}

interface TraceProps {
  segments: number;
  /** Beats per minute at rest. */
  bpm?: number;
  amplitude?: number;
  thickness?: number;
  opacity?: number;
  /** Beats offset, so an echo trace runs behind the live one. */
  phase?: number;
  z?: number;
}

function Trace({
  segments,
  bpm = 60,
  amplitude = 0.92,
  thickness = 0.018,
  opacity = 1,
  phase = 0,
  z = 0,
}: TraceProps) {
  const material = useRef<THREE.ShaderMaterial>(null);
  const shownSurge = useRef(0);
  const viewport = useThree((state) => state.viewport);

  const geometry = useMemo(() => buildRibbon(segments), [segments]);

  // R3F only disposes what it created, so geometry built here is our problem.
  useEffect(() => () => geometry.dispose(), [geometry]);

  const uniforms = useMemo(
    () => ({
      uSweep: { value: phase },
      uCycles: { value: 5 },
      uAmp: { value: amplitude },
      uThickness: { value: thickness },
      uHalfWidth: { value: 8 },
      uSurge: { value: 0 },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color("#a6192e") },
      uHot: { value: new THREE.Color("#ff2b3a") },
    }),
    // Built once; everything below is pushed imperatively each frame.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useFrame((_, delta) => {
    const m = material.current;
    if (!m) return;

    // Damped, so a burst of sections entering at once swells the trace rather
    // than snapping it to full amplitude and back.
    shownSurge.current = THREE.MathUtils.damp(
      shownSurge.current,
      signal.surge,
      3.4,
      delta,
    );
    signal.surge = THREE.MathUtils.damp(signal.surge, 0, 1.1, delta);
    const surge = shownSurge.current;

    // 60bpm at rest. An arriving section quickens it.
    const beatsPerSecond = (bpm + surge * 34) / 60;
    m.uniforms.uSweep.value += delta * beatsPerSecond;

    // Width comes from the camera rather than a constant, so the beat keeps its
    // proportions on a phone and on an ultrawide.
    const halfWidth = (viewport.width / 2) * 1.04;
    m.uniforms.uHalfWidth.value = halfWidth;
    m.uniforms.uCycles.value = Math.max(2, (halfWidth * 2) / 3.4);

    m.uniforms.uAmp.value = amplitude * (1 + surge * 0.4);
    m.uniforms.uSurge.value = surge;
  });

  return (
    <mesh geometry={geometry} position={[0, 0, z]} frustumCulled={false}>
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        depthTest={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

export function Signal({ segments = 1400 }: { segments?: number }) {
  return (
    <>
      {/* The echo runs a third of a beat behind, dim and slightly larger
          depth, and the sense of a monitor that has been on a while. */}
      <Trace
        segments={Math.round(segments * 0.6)}
        amplitude={1.15}
        thickness={0.03}
        opacity={0.22}
        phase={0.34}
        z={-0.6}
      />
      <Trace segments={segments} />
    </>
  );
}
