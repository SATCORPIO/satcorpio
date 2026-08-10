"use client";

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { mulberry32 } from "@/lib/rng";
import { scrollProgress } from "@/lib/scroll-progress";

/**
 * THE REGISTRY
 *
 * KYRAX is not a computer with a glowing brain in it. It is the archive   the
 * room where everything anyone ever told the Concierge is kept, indexed, and
 * cross-referenced. Thousands of cards suspended in the cold, drifting.
 *
 * Three things make it read as intelligent rather than decorative:
 *   1. a sorting wave that travels through the field, as if something is
 *      being looked up;
 *   2. a handful of cards flagged in red   the ones that matter;
 *   3. a patch of cards that turns to face the pointer. The archive notices
 *      you, which is considerably more unsettling than a particle brain.
 *
 * Everything animates in the vertex shader off per-instance attributes, so the
 * CPU never touches a matrix after setup.
 */

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uSortWave;    // position of the travelling look-up, in z
  uniform vec3  uFocus;       // pointer, projected into the field
  uniform float uFocusRadius;

  attribute float aSeed;
  attribute float aFlag;      // 1.0 on the cards that matter

  varying float vSeed;
  varying float vFlag;
  varying float vAttention;
  varying float vDepthFade;
  varying vec2  vUv;

  void main() {
    vUv = uv;
    vSeed = aSeed;
    vFlag = aFlag;

    vec3 centre = instanceMatrix[3].xyz;

    // Idle drift, each card on its own clock.
    vec3 drift = vec3(
      sin(uTime * 0.22 + aSeed * 41.0),
      cos(uTime * 0.18 + aSeed * 27.0),
      sin(uTime * 0.13 + aSeed * 63.0)
    ) * 0.14;

    // A look-up sweeping through the archive: cards lift as it passes.
    float wave = exp(-pow((centre.z - uSortWave) * 0.32, 2.0));

    // Proximity to the pointer. Near cards turn to face the viewer.
    float d = distance(centre, uFocus);
    float attention = 1.0 - smoothstep(0.0, uFocusRadius, d);
    vAttention = max(attention, wave * 0.65);

    // The card in its own filed orientation...
    vec3 filed = (instanceMatrix * vec4(position, 1.0)).xyz + drift;
    vec4 filedView = modelViewMatrix * vec4(filed, 1.0);

    // ...and the same card squared up to the viewer.
    vec4 centreView = modelViewMatrix * vec4(centre + drift, 1.0);
    float scale = length(instanceMatrix[0].xyz);
    vec3 facingView = centreView.xyz + vec3(position.xy * scale, 0.0);

    vec3 finalView = mix(filedView.xyz, facingView, vAttention);
    finalView.z += wave * 0.55;

    // Cards drifting up against the lens become huge white slabs that shout
    // over the writing. Fade them out near and far   it reads as depth of
    // field and keeps the page legible.
    float depth = -finalView.z;
    vDepthFade = smoothstep(3.0, 9.0, depth) * (1.0 - smoothstep(34.0, 50.0, depth));

    gl_Position = projectionMatrix * vec4(finalView, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uPaper;
  uniform vec3 uFlagged;
  uniform vec3 uAccent;
  uniform float uFade;

  varying float vSeed;
  varying float vFlag;
  varying float vAttention;
  varying float vDepthFade;
  varying vec2  vUv;

  void main() {
    // Card stock, with a margin and a few ruled lines of "typing".
    vec2 m = step(vec2(0.06), vUv) * step(vUv, vec2(0.94));
    float inside = m.x * m.y;

    float rows = floor(vUv.y * 7.0);
    float ruled = step(0.55, fract(vUv.y * 7.0));
    // Ragged right edge, so the lines read as text rather than stripes.
    float lineEnd = 0.34 + fract(sin(rows * 12.9 + vSeed * 51.3) * 43758.5) * 0.52;
    float text = ruled * step(vUv.x, lineEnd) * step(0.10, vUv.x) * inside;

    vec3 base = mix(uPaper, uFlagged, vFlag);
    // The header rule across the top of every card.
    float header = step(0.80, vUv.y) * step(vUv.y, 0.88) * inside;

    vec3 col = base * (0.11 + vAttention * 0.62);
    col = mix(col, base * 0.34, text * 0.8);
    col = mix(col, uAccent, header * (0.20 + vAttention * 0.45));

    float alpha = (0.06 + vAttention * 0.52) * uFade * vDepthFade;
    alpha *= mix(0.35, 1.0, inside);

    gl_FragColor = vec4(col, alpha);
  }
`;

export interface RegistryProps {
  count?: number;
  /** Half-extents of the volume the archive fills. */
  spread?: [number, number, number];
}

export function Registry({
  count = 4000,
  spread = [16, 9, 34],
}: RegistryProps) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const focus = useRef(new THREE.Vector3(0, 0, 0));

  const { seeds, flags } = useMemo(() => {
    const rng = mulberry32(0x1de2c);
    const s = new Float32Array(count);
    const f = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      s[i] = rng();
      // Roughly one card in twenty-five is flagged.
      f[i] = rng() > 0.96 ? 1 : 0;
    }
    return { seeds: s, flags: f };
  }, [count]);

  // Lay the archive out once. Nothing touches these matrices again.
  useEffect(() => {
    const instanced = mesh.current;
    if (!instanced) return;

    const rng = mulberry32(0xa4c17e);
    const dummy = new THREE.Object3D();
    const [sx, sy, sz] = spread;

    for (let i = 0; i < count; i++) {
      dummy.position.set(
        (rng() * 2 - 1) * sx,
        (rng() * 2 - 1) * sy,
        (rng() * 2 - 1) * sz,
      );
      // Filed at angles, as things in a real archive are.
      dummy.rotation.set(
        (rng() - 0.5) * 0.5,
        (rng() - 0.5) * 1.9,
        (rng() - 0.5) * 0.28,
      );
      const scale = 0.55 + rng() * 0.55;
      dummy.scale.setScalar(scale);
      dummy.updateMatrix();
      instanced.setMatrixAt(i, dummy.matrix);
    }
    instanced.instanceMatrix.needsUpdate = true;

    instanced.geometry.setAttribute(
      "aSeed",
      new THREE.InstancedBufferAttribute(seeds, 1),
    );
    instanced.geometry.setAttribute(
      "aFlag",
      new THREE.InstancedBufferAttribute(flags, 1),
    );
    // Cards never leave the volume, so a hand-set sphere beats recomputing it.
    instanced.boundingSphere = new THREE.Sphere(
      new THREE.Vector3(),
      Math.hypot(sx, sy, sz),
    );
  }, [count, spread, seeds, flags]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSortWave: { value: 0 },
      uFocus: { value: new THREE.Vector3(0, 0, 0) },
      uFocusRadius: { value: 6.5 },
      uPaper: { value: new THREE.Color("#d6e4e5") },
      uFlagged: { value: new THREE.Color("#c8324a") },
      uAccent: { value: new THREE.Color("#eaf3f4") },
      uFade: { value: 1 },
    }),
    // Built once; pushed imperatively below.
    [],
  );

  useFrame((state, delta) => {
    const m = material.current;
    if (!m) return;

    m.uniforms.uTime.value += delta;

    // The look-up sweeps from the back of the archive toward the reader.
    const period = 9;
    const t = (m.uniforms.uTime.value % period) / period;
    m.uniforms.uSortWave.value = THREE.MathUtils.lerp(-spread[2], spread[2], t);

    // Project the pointer a little way into the field.
    focus.current.set(
      state.pointer.x * spread[0] * 0.72,
      state.pointer.y * spread[1] * 0.72,
      state.camera.position.z - 7,
    );
    (m.uniforms.uFocus.value as THREE.Vector3).lerp(focus.current, 0.1);

    // Scroll flies the reader deeper into the archive.
    state.camera.position.z = THREE.MathUtils.damp(
      state.camera.position.z,
      12 - scrollProgress.value * 40,
      2.6,
      delta,
    );
  });

  return (
    <instancedMesh
      ref={mesh}
      args={[undefined, undefined, count]}
      frustumCulled={false}
    >
      <planeGeometry args={[1, 0.62]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        side={THREE.DoubleSide}
        blending={THREE.AdditiveBlending}
      />
    </instancedMesh>
  );
}
