"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll-progress";
import { NOISE_GLSL } from "./noise";
import { surfaceBlend, terrainAdvance } from "./journey";

/**
 * THE GROUND
 *
 * The half of the journey below the cloud deck: a displaced tile of NAMTAR
 * with an ocean in the low ground and a sky the colour of its atmosphere.
 *
 * The camera does not actually travel — the ground flows past it. That keeps
 * the flyover unbounded on a tile small enough to tessellate properly, keeps
 * it exactly reversible when the reader scrolls back up, and means the near
 * geometry is always the middle of the plane rather than whatever edge we
 * happened to fly toward.
 */

const SEA_LEVEL = 0;

/** Shared by the ground, the water and the sky, so they agree on the world. */
const TERRAIN_GLSL = /* glsl */ `
  ${NOISE_GLSL}

  float nmTerrain(vec2 q) {
    vec3 p = vec3(q * 0.0085, 0.0);
    float base  = nmFbm(p, 4);
    float ridge = nmRidge(p * 2.3 + 7.4, 4);
    float h = base * 0.42 + ridge * 0.78;
    // Pushing the curve makes the low ground flat enough to read as sea floor
    // and the high ground steep enough to read as mountains.
    h = pow(max(h, 0.0), 1.9);
    // Amplitude is set by what the camera has to clear: the flyover runs at a
    // fixed altitude, so peaks that beat it put the reader inside a mountain.
    return h * 46.0 - 9.0;
  }
`;

const groundVertex = /* glsl */ `
  uniform float uAdvance;
  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying float vHeight;

  ${TERRAIN_GLSL}

  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vec2 q = vec2(world.x, world.z - uAdvance);
    float h = nmTerrain(q);
    world.y += h;

    // The normal is sampled from the height field rather than taken from the
    // triangle. Screen-space derivatives were cheaper but shaded every quad
    // flat, and at this tessellation the ground came out as glass shards.
    const float e = 2.0;
    float hx = nmTerrain(q + vec2(e, 0.0));
    float hz = nmTerrain(q + vec2(0.0, e));
    vNormalW = normalize(cross(
      vec3(0.0, hz - h, e),
      vec3(e, hx - h, 0.0)
    ));

    vWorld = world.xyz;
    vHeight = h;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const groundFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform vec3  uHaze;
  uniform float uOpacity;
  uniform float uAdvance;

  varying vec3 vWorld;
  varying vec3 vNormalW;
  varying float vHeight;

  ${TERRAIN_GLSL}

  void main() {
    vec3 n = normalize(vNormalW);
    float slope = 1.0 - n.y;
    float alt = clamp((vHeight + 8.0) / 40.0, 0.0, 1.0);

    vec3 silt   = vec3(0.200, 0.165, 0.115);
    vec3 grass  = vec3(0.115, 0.145, 0.070);
    vec3 scrub  = vec3(0.215, 0.170, 0.085);
    vec3 basalt = vec3(0.115, 0.110, 0.110);
    vec3 snow   = vec3(0.720, 0.740, 0.735);

    vec3 albedo = mix(silt, grass, smoothstep(0.04, 0.20, alt));
    albedo = mix(albedo, scrub, smoothstep(0.28, 0.55, alt));
    albedo = mix(albedo, snow, smoothstep(0.72, 0.92, alt));
    // Anything steep sheds its cover and shows the rock underneath.
    albedo = mix(albedo, basalt, smoothstep(0.35, 0.75, slope));

    // Ground detail — without this the tile reads as a smooth clay model.
    float grain = nmFbm(vec3(vWorld.x, vWorld.z - uAdvance, 0.0) * 0.06, 3);
    albedo *= 0.78 + grain * 0.5;

    float lambert = max(dot(n, uSun), 0.0);
    float sky = 0.34 + 0.26 * n.y;
    vec3 color = albedo * (sky + lambert * 1.55);
    color += vec3(0.85, 0.55, 0.28) * pow(lambert, 6.0) * 0.20;

    // Aerial perspective. This is what sells the scale of the thing.
    color = nmHaze(color, uHaze, length(vWorld - cameraPosition));

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const waterVertex = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 world = modelMatrix * vec4(position, 1.0);
    vWorld = world.xyz;
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const waterFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform vec3  uHaze;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uAdvance;

  varying vec3 vWorld;

  ${TERRAIN_GLSL}

  void main() {
    vec2 q = vec2(vWorld.x, vWorld.z - uAdvance);

    // Anywhere the ground is above the waterline, there is no water.
    float floorH = nmTerrain(q);
    if (floorH > 0.6) discard;

    // Swell, as a normal perturbation only — displacing the mesh would cost a
    // tessellation this plane does not need.
    float s1 = nmFbm(vec3(q * 0.05 + vec2(uTime * 0.06, 0.0), 0.0), 3);
    float s2 = nmFbm(vec3(q * 0.13 - vec2(0.0, uTime * 0.09), 1.7), 2);
    vec3 n = normalize(vec3((s1 - 0.5) * 0.55, 1.0, (s2 - 0.5) * 0.55));

    vec3 view = normalize(cameraPosition - vWorld);
    vec3 h = normalize(uSun + view);
    float spec = pow(max(dot(n, h), 0.0), 90.0);
    float fres = pow(1.0 - max(dot(n, view), 0.0), 4.0);

    // Depth by how far the sea floor is below the surface.
    float depth = clamp(-floorH / 16.0, 0.0, 1.0);
    vec3 shallow = vec3(0.075, 0.185, 0.195);
    vec3 deep    = vec3(0.012, 0.045, 0.070);
    vec3 color = mix(shallow, deep, depth);

    color += vec3(0.95, 0.72, 0.42) * spec * 1.6;
    color = mix(color, uHaze * 0.9, fres * 0.55);

    color = nmHaze(color, uHaze, length(vWorld - cameraPosition));

    gl_FragColor = vec4(color, uOpacity);
  }
`;

const skyVertex = /* glsl */ `
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const skyFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform vec3  uHaze;
  uniform vec3  uZenith;
  uniform float uOpacity;

  varying vec3 vDir;

  void main() {
    float up = clamp(vDir.y * 0.5 + 0.5, 0.0, 1.0);
    // Weighted hard toward the horizon: the haze band should be a band, not a
    // gradient filling half the sky.
    vec3 color = mix(uHaze, uZenith, pow(smoothstep(0.5, 1.0, up), 0.65));

    // The sun, low and enormous, with a bloom that dies before the zenith.
    float d = max(dot(normalize(vDir), uSun), 0.0);
    color += vec3(1.0, 0.62, 0.28) * pow(d, 220.0) * 2.4;
    color += vec3(0.85, 0.46, 0.22) * pow(d, 6.0) * 0.30;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

/** Sun direction on the surface — low, ahead and to the left. */
export const SURFACE_SUN = new THREE.Vector3(-0.42, 0.16, -0.89).normalize();

export function Terrain({ segments = 180 }: { segments?: number }) {
  const ground = useRef<THREE.ShaderMaterial>(null);
  const water = useRef<THREE.ShaderMaterial>(null);
  const sky = useRef<THREE.ShaderMaterial>(null);
  const group = useRef<THREE.Group>(null);
  const dome = useRef<THREE.Mesh>(null);

  const uniforms = useMemo(() => {
    const haze = new THREE.Color("#7a4a26");
    return {
      ground: {
        uSun: { value: SURFACE_SUN },
        uHaze: { value: haze },
        uAdvance: { value: 0 },
        uOpacity: { value: 0 },
      },
      water: {
        uSun: { value: SURFACE_SUN },
        uHaze: { value: haze },
        uAdvance: { value: 0 },
        uOpacity: { value: 0 },
        uTime: { value: 0 },
      },
      sky: {
        uSun: { value: SURFACE_SUN },
        uHaze: { value: haze },
        uZenith: { value: new THREE.Color("#0a1020") },
        uOpacity: { value: 0 },
      },
    };
  }, []);

  useFrame((state, delta) => {
    const t = scrollProgress.value;
    const blend = surfaceBlend(t);
    const advance = terrainAdvance(t);

    if (group.current) group.current.visible = blend > 0.01;

    if (ground.current) {
      ground.current.uniforms.uAdvance.value = advance;
      ground.current.uniforms.uOpacity.value = blend;
    }
    if (water.current) {
      water.current.uniforms.uAdvance.value = advance;
      water.current.uniforms.uOpacity.value = blend;
      water.current.uniforms.uTime.value += delta;
    }
    if (sky.current) sky.current.uniforms.uOpacity.value = blend;

    // The dome is the horizon, so it travels with the viewer rather than
    // sitting somewhere the viewer can approach.
    if (dome.current) dome.current.position.copy(state.camera.position);
  });

  return (
    <group ref={group} visible={false}>
      <mesh ref={dome}>
        <sphereGeometry args={[400, 32, 20]} />
        <shaderMaterial
          ref={sky}
          uniforms={uniforms.sky}
          vertexShader={skyVertex}
          fragmentShader={skyFragment}
          side={THREE.BackSide}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* Culling is off on both ground planes: the bounding sphere is computed
          from the flat geometry, and displacement pushes the far corners just
          outside it. They fill the frame whenever the group is visible. */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} frustumCulled={false}>
        <planeGeometry args={[560, 560, segments, segments]} />
        <shaderMaterial
          ref={ground}
          uniforms={uniforms.ground}
          vertexShader={groundVertex}
          fragmentShader={groundFragment}
          transparent
        />
      </mesh>

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, SEA_LEVEL, 0]}
        frustumCulled={false}
      >
        <planeGeometry args={[900, 900, 1, 1]} />
        <shaderMaterial
          ref={water}
          uniforms={uniforms.water}
          vertexShader={waterVertex}
          fragmentShader={waterFragment}
          transparent
        />
      </mesh>
    </group>
  );
}
