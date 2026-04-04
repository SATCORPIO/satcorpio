"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const fragmentShader = `
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;

// Simplex 2D noise from glsl-noise
vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
float snoise(vec2 v){
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
           -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy) );
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1;
  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
  + i.x + vec3(0.0, i1.x, 1.0 ));
  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
    dot(x12.zw,x12.zw)), 0.0);
  m = m*m ;
  m = m*m ;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

void main() {
  vec2 st = gl_FragCoord.xy / uResolution.xy;
  st.x *= uResolution.x / uResolution.y;

  vec2 mouseDist = uMouse - st;
  float dist = length(mouseDist);

  // Animate the noise
  vec2 pos = st * 3.0;
  // A slow drift
  float noise = snoise(pos + uTime * 0.1);
  
  // Tactical grid lines
  vec2 grid = fract(st * 40.0);
  float lineX = smoothstep(0.0, 0.05, grid.x) * smoothstep(1.0, 0.95, grid.x);
  float lineY = smoothstep(0.0, 0.05, grid.y) * smoothstep(1.0, 0.95, grid.y);
  float gridLines = 1.0 - (lineX * lineY);

  // Neural pulse glow
  vec3 colorZero = vec3(0.01, 0.02, 0.03); // Deep bg
  vec3 colorPulse = vec3(0.0, 1.0, 0.25); // SATCORP Green
  
  // Combine noise with grid and distance to mouse for interaction
  float glow = (noise * 0.5 + 0.5) * exp(-dist * 2.0);
  
  // Only glow near grid lines loosely
  glow *= gridLines * 0.15;

  vec3 col = mix(colorZero, colorPulse, glow);
  
  gl_FragColor = vec4(col, 1.0);
}
`;

const vertexShader = `
void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;

const ShaderPlane = () => {
  const { size, viewport } = useThree();
  const materialRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
    }),
    [size]
  );

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
      
      // Update mouse 0 to 1 mapping
      // Pointer is -1 to 1 natively in R3F, map to 0..1 based on aspect ratio mapping done in shader
      const aspect = size.width / size.height;
      let mx = (state.pointer.x + 1) / 2;
      let my = (state.pointer.y + 1) / 2;
      mx *= aspect;
      materialRef.current.uniforms.uMouse.value.set(mx, my);
    }
  });

  return (
    <mesh>
      <planeGeometry args={[viewport.width, viewport.height]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  );
};

export function NeuralGrid() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, pointerEvents: 'none', background: '#030508' }}>
      <Canvas eventSource={typeof window !== 'undefined' ? document.getElementById('root') || document.body : undefined}>
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
