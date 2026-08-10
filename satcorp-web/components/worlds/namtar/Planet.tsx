"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { scrollProgress } from "@/lib/scroll-progress";
import { NOISE_GLSL } from "./noise";
import { surfaceBlend } from "./journey";

/**
 * NAMTAR FROM ORBIT
 *
 * Four shells and nothing else: the ground, a cloud deck, an atmosphere, and
 * two moons on tilted orbits. Everything is procedural   no 4k textures to
 * ship, and the same noise field feeds the terrain you later fly over, so the
 * planet you leave and the ground you arrive on are the same world.
 *
 * The whole group fades out under `opacity` as the descent crosses into the
 * surface act; nothing here needs to know that is happening.
 */

const PLANET_RADIUS = 6;

/* --- the ground --- */

const surfaceVertex = /* glsl */ `
  varying vec3 vDir;      // object-space direction   where on the globe we are
  varying vec3 vNormalW;
  varying vec3 vViewW;

  void main() {
    vDir = normalize(position);
    vNormalW = normalize(mat3(modelMatrix) * normal);
    vec4 world = modelMatrix * vec4(position, 1.0);
    vViewW = normalize(cameraPosition - world.xyz);
    gl_Position = projectionMatrix * viewMatrix * world;
  }
`;

const surfaceFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform float uOpacity;
  uniform float uTime;

  varying vec3 vDir;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  ${NOISE_GLSL}

  void main() {
    vec3 p = vDir * 2.05;

    // Continents. The ridge term is what stops the coastlines reading as blobs.
    float base = nmFbm(p, 5);
    float ridge = nmRidge(p * 1.9 + 11.3, 4);
    float height = base * 0.78 + ridge * 0.32 - 0.16;

    float land = smoothstep(0.30, 0.36, height);
    float shore = smoothstep(0.24, 0.32, height) * (1.0 - land);

    // Ice at the poles, ragged rather than a clean band.
    float lat = abs(vDir.y);
    float ice = smoothstep(0.74, 0.9, lat + nmFbm(p * 3.1, 3) * 0.12);

    vec3 deep    = vec3(0.020, 0.075, 0.105);
    vec3 shallow = vec3(0.055, 0.190, 0.215);
    vec3 forest  = vec3(0.105, 0.150, 0.070);
    vec3 scrub   = vec3(0.230, 0.175, 0.085);
    vec3 rock    = vec3(0.270, 0.235, 0.200);
    vec3 snow    = vec3(0.780, 0.800, 0.790);

    // Biome by altitude, then a second noise to break the bands apart.
    float alt = smoothstep(0.33, 0.62, height);
    vec3 ground = mix(forest, scrub, smoothstep(0.0, 0.55, alt));
    ground = mix(ground, rock, smoothstep(0.55, 1.0, alt));
    ground = mix(ground, scrub * 1.15, nmFbm(p * 6.0 + 4.0, 3) * 0.35);

    vec3 albedo = mix(deep, shallow, shore);
    albedo = mix(albedo, ground, land);
    albedo = mix(albedo, snow, ice * 0.85);

    // Day side.
    float lambert = dot(normalize(vNormalW), uSun);
    float day = smoothstep(-0.14, 0.30, lambert);

    // Water catches the sun; land does not.
    vec3 h = normalize(uSun + vViewW);
    float spec = pow(max(dot(normalize(vNormalW), h), 0.0), 48.0)
               * (1.0 - land) * step(ice, 0.5);

    vec3 color = albedo * (0.06 + day * 1.30);
    color += vec3(0.85, 0.78, 0.62) * spec * 0.9 * day;

    // Night side: settlement lights, clustered on habitable land only.
    float cluster = smoothstep(0.55, 0.80, nmFbm(p * 7.5 + 21.0, 4));
    float grid = smoothstep(0.62, 0.86, nmNoise(vDir * 130.0));
    float lights = land * cluster * grid * (1.0 - smoothstep(0.0, 0.35, alt));
    lights *= (1.0 - day) * (0.75 + 0.25 * sin(uTime * 0.7 + cluster * 30.0));
    color += vec3(1.0, 0.62, 0.26) * lights * 1.6;

    // Atmosphere seen against the ground   thickest at the limb.
    float rim = 1.0 - max(dot(normalize(vNormalW), vViewW), 0.0);
    color += vec3(0.36, 0.24, 0.16) * pow(rim, 3.0) * day * 1.5;

    gl_FragColor = vec4(color, uOpacity);
  }
`;

/* --- the cloud deck --- */

const cloudFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform float uOpacity;
  uniform float uTime;

  varying vec3 vDir;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  ${NOISE_GLSL}

  void main() {
    // Two layers drifting at different rates   one weather system passing
    // over another, which is what stops clouds looking painted on.
    vec3 p = vDir * 3.4;
    float a = nmFbm(p + vec3(uTime * 0.012, 0.0, 0.0), 5);
    float b = nmFbm(p * 1.7 - vec3(uTime * 0.019, 0.0, uTime * 0.006), 4);
    // Deliberately broken cloud. Full cover is meteorologically plausible and
    // visually useless   the continents are the reason to look at the planet.
    float cover = smoothstep(0.56, 0.84, a * 0.65 + b * 0.45);

    float lambert = dot(normalize(vNormalW), uSun);
    float day = smoothstep(-0.18, 0.34, lambert);

    // Cloud tops are bright; the undersides on the night side are barely there.
    vec3 lit = mix(vec3(0.10, 0.11, 0.14), vec3(0.94, 0.90, 0.84), day);
    float rim = 1.0 - max(dot(normalize(vNormalW), vViewW), 0.0);

    float alpha = cover * uOpacity * (0.16 + day * 0.66) * (0.7 + rim * 0.5);
    gl_FragColor = vec4(lit, alpha);
  }
`;

/* --- the atmosphere shell --- */

const atmosphereFragment = /* glsl */ `
  uniform vec3  uSun;
  uniform float uOpacity;

  varying vec3 vDir;
  varying vec3 vNormalW;
  varying vec3 vViewW;

  void main() {
    // Rendered on the inside of a slightly larger sphere, so the fresnel runs
    // the other way and the glow sits outside the planet's edge.
    float fres = pow(1.0 - max(dot(-normalize(vNormalW), vViewW), 0.0), 4.2);
    float lambert = dot(-normalize(vNormalW), uSun);
    float day = smoothstep(-0.55, 0.45, lambert);

    // Amber where the sun strikes, cold teal on the terminator. NAMTAR's air
    // is not Earth's, and the accent has to survive the trip to orbit.
    vec3 warm = vec3(0.85, 0.49, 0.18);
    vec3 cold = vec3(0.12, 0.28, 0.36);
    vec3 color = mix(cold, warm, day);

    gl_FragColor = vec4(color, fres * uOpacity * (0.22 + day * 0.85));
  }
`;

export function Planet({ detail = 64 }: { detail?: number }) {
  const group = useRef<THREE.Group>(null);
  const moons = useRef<THREE.Group>(null);
  const surface = useRef<THREE.ShaderMaterial>(null);
  const clouds = useRef<THREE.ShaderMaterial>(null);
  const air = useRef<THREE.ShaderMaterial>(null);

  // One sun direction, shared by all three shells   they must agree on where
  // the terminator falls or the planet comes apart at the edges.
  const sun = useMemo(() => new THREE.Vector3(0.62, 0.34, 0.71).normalize(), []);

  const uniforms = useMemo(
    () => ({
      surface: {
        uSun: { value: sun },
        uOpacity: { value: 1 },
        uTime: { value: 0 },
      },
      clouds: {
        uSun: { value: sun },
        uOpacity: { value: 1 },
        uTime: { value: 0 },
      },
      air: {
        uSun: { value: sun },
        uOpacity: { value: 1 },
      },
    }),
    [sun],
  );

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;

    // The planet is only on screen while the reader is in orbit. Nothing has
    // to tell it that   the journey is a pure function of scroll.
    const o = 1 - surfaceBlend(scrollProgress.value);

    if (group.current) {
      group.current.rotation.y += delta * 0.012;
      // Once the descent has crossed over there is nothing to draw here.
      group.current.visible = o > 0.01;
    }

    if (moons.current) {
      moons.current.rotation.y += delta * 0.06;
      moons.current.visible = o > 0.01;
      // Two meshes with plain materials   cheaper to fade by hand than to
      // thread a uniform through them.
      moons.current.traverse((child) => {
        const mesh = child as THREE.Mesh;
        const material = mesh.material as THREE.Material | undefined;
        if (material && "opacity" in material) material.opacity = o;
      });
    }
    if (surface.current) {
      surface.current.uniforms.uTime.value = t;
      surface.current.uniforms.uOpacity.value = o;
    }
    if (clouds.current) {
      clouds.current.uniforms.uTime.value = t;
      clouds.current.uniforms.uOpacity.value = o;
    }
    if (air.current) air.current.uniforms.uOpacity.value = o;
  });

  return (
    <>
      {/* The sun sits outside the rotating group: the planet turns under a
          fixed terminator, and the moons keep one light source. */}
      <directionalLight position={sun.toArray()} intensity={2.4} />
      <ambientLight intensity={0.12} />

      <group ref={group}>
        <mesh>
          <sphereGeometry args={[PLANET_RADIUS, detail, detail / 2]} />
          <shaderMaterial
            ref={surface}
            uniforms={uniforms.surface}
            vertexShader={surfaceVertex}
            fragmentShader={surfaceFragment}
            transparent
          />
        </mesh>

        <mesh>
          <sphereGeometry args={[PLANET_RADIUS * 1.022, detail, detail / 2]} />
          <shaderMaterial
            ref={clouds}
            uniforms={uniforms.clouds}
            vertexShader={surfaceVertex}
            fragmentShader={cloudFragment}
            transparent
            depthWrite={false}
          />
        </mesh>
      </group>

      {/* The air does not turn with the ground. */}
      <mesh>
        <sphereGeometry args={[PLANET_RADIUS * 1.16, 48, 24]} />
        <shaderMaterial
          ref={air}
          uniforms={uniforms.air}
          vertexShader={surfaceVertex}
          fragmentShader={atmosphereFragment}
          transparent
          depthWrite={false}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Two moons, because one reads as Earth. Tilted out of the ecliptic so
          they cross the disc rather than sitting on it. */}
      <group ref={moons} rotation={[0.32, 0, 0.18]}>
        <Moon distance={10.4} size={0.62} phase={0} tone="#8f8a80" />
        <Moon distance={14.2} size={0.38} phase={2.1} tone="#6d6a68" />
      </group>
    </>
  );
}

function Moon({
  distance,
  size,
  phase,
  tone,
}: {
  distance: number;
  size: number;
  phase: number;
  tone: string;
}) {
  return (
    <mesh
      position={[
        Math.cos(phase) * distance,
        Math.sin(phase) * 1.4,
        Math.sin(phase) * distance,
      ]}
    >
      <sphereGeometry args={[size, 24, 12]} />
      <meshStandardMaterial
        color={tone}
        roughness={1}
        metalness={0}
        transparent
      />
    </mesh>
  );
}
