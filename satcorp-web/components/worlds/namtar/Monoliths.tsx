"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll-progress";
import { NOISE_GLSL } from "./noise";
import { MONOLITH_X, band, pillarFocus, surfaceBlend } from "./journey";
import { SURFACE_SUN } from "./Terrain";

/**
 * THE FIVE PILLARS
 *
 * Explore, Build, Evolve, Survive, Command   standing on the terrain as
 * monoliths that rise out of it while the reader passes the section that names
 * them, and light up when one is chosen from the list.
 *
 * They are rooted far below the lowest ground the noise can produce, so no
 * monolith can ever be caught hovering above a valley. Rising is the whole
 * slab sliding up out of the rock; it is buried, not absent.
 */

const ROOT_DEPTH = 90;
const RISE = 128;
const HEIGHT = 140;
const WIDTH = 11;

const vertexShader = /* glsl */ `
  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying vec2 vUv;

  void main() {
    vUv = uv;
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3  uSun;
  uniform vec3  uHaze;
  uniform vec3  uAccent;
  uniform float uOpacity;
  uniform float uFocus;
  uniform float uTime;

  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying vec2 vUv;

  ${NOISE_GLSL}

  void main() {
    vec3 n = normalize(vNormalW);

    // Cut stone: banded, weathered, nothing like the terrain around it.
    float band_ = nmFbm(vec3(vUv * vec2(6.0, 40.0), 0.0), 4);
    vec3 stone = mix(vec3(0.085, 0.080, 0.088), vec3(0.230, 0.210, 0.195), band_);

    float lambert = max(dot(n, uSun), 0.0);
    // The sun is ahead of the camera, so the faces the reader sees are the
    // shadowed ones. Without a heavy sky term the slabs come out as holes cut
    // in the landscape rather than as stone.
    vec3 color = stone * (0.85 + max(n.y, 0.0) * 0.3 + lambert * 1.2);

    // Worked edges, so the silhouette reads even against a dark hillside.
    color += uAccent * 0.10 * smoothstep(0.44, 0.5, abs(vUv.x - 0.5));

    // A single seam of light running the height of the slab   the thing that
    // says this was made, not eroded.
    float seam = exp(-pow((vUv.x - 0.5) * 30.0, 2.0));
    float travel = fract(vUv.y * 0.6 - uTime * 0.06);
    float charge = 0.35 + 0.65 * exp(-pow((travel - 0.5) * 5.0, 2.0));
    color += uAccent * seam * charge * (0.75 + uFocus * 2.6);

    // Chosen pillars catch a rim light, so a selection reads from any angle.
    float rim = pow(1.0 - max(dot(n, normalize(cameraPosition - vWorld)), 0.0), 3.0);
    color += uAccent * rim * uFocus * 0.9;

    color = nmHaze(color, uHaze, length(vWorld - cameraPosition));

    gl_FragColor = vec4(color, uOpacity);
  }
`;

export function Monoliths() {
  return (
    <group>
      {MONOLITH_X.map((x, i) => (
        <Monolith key={x} index={i} x={x} />
      ))}
    </group>
  );
}

function Monolith({ index, x }: { index: number; x: number }) {
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<THREE.ShaderMaterial>(null);
  const focus = useRef(0);

  const uniforms = useMemo(
    () => ({
      uSun: { value: SURFACE_SUN },
      uHaze: { value: new THREE.Color("#7a4a26") },
      uAccent: { value: new THREE.Color("#d97e2f") },
      uOpacity: { value: 0 },
      uFocus: { value: 0 },
      uTime: { value: 0 },
    }),
    [],
  );

  // Staggered so they come up as a row being read left to right rather than
  // five slabs on one switch.
  const rise = useMemo(() => {
    const start = 0.3 + index * 0.016;
    return [start, start + 0.08] as [number, number];
  }, [index]);

  useFrame((state, delta) => {
    const t = scrollProgress.value;
    const blend = surfaceBlend(t);
    const up = band(t, rise);

    const m = mesh.current;
    if (m) {
      m.visible = blend > 0.01 && up > 0.001;
      // Ease out   the last few metres are slow, as something that heavy
      // coming out of the ground would be.
      const eased = 1 - Math.pow(1 - up, 3);
      m.position.y = -ROOT_DEPTH + eased * RISE;
      // Chosen pillars lean a degree out of true toward the viewer.
      m.rotation.z = THREE.MathUtils.damp(
        m.rotation.z,
        focus.current * -0.012 * Math.sign(x || 1),
        3,
        delta,
      );
    }

    const target = pillarFocus.value === index ? 1 : 0;
    focus.current = THREE.MathUtils.damp(focus.current, target, 5, delta);

    if (material.current) {
      material.current.uniforms.uOpacity.value = blend;
      material.current.uniforms.uFocus.value = focus.current;
      material.current.uniforms.uTime.value += delta;
    }
  });

  return (
    <mesh
      ref={mesh}
      position={[x, -ROOT_DEPTH, -60 - Math.abs(x)]}
      rotation={[0, index * 0.14 - 0.28, 0]}
      visible={false}
    >
      <boxGeometry args={[WIDTH, HEIGHT, WIDTH * 0.42]} />
      <shaderMaterial
        ref={material}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  );
}
