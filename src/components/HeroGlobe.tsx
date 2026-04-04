"use client";

import * as React from "react";
import { useRef, useState, useMemo, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree, ThreeEvent } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  OrbitControls, 
  Line, 
  Sphere, 
  MeshDistortMaterial, 
  Html,
  Float
} from "@react-three/drei";
import * as THREE from "three";

// --- Sub-components ---

const Earth = ({ segments = 48 }: { segments?: number }) => {
  const earthRef = useRef<THREE.Group>(null);
  const cloudRef = useRef<THREE.Points>(null);

  // Generate tactical node points for the holographic shell
  const pointsData = useMemo(() => {
    const pointCount = 1200; // Optimized for performance
    const array = new Float32Array(pointCount * 3);
    const sphereRadius = 1.05;
    
    for (let i = 0; i < pointCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointCount);
      const theta = Math.sqrt(pointCount * Math.PI) * phi;
      
      const v = new THREE.Vector3().setFromSphericalCoords(sphereRadius, phi, theta);
      array[i * 3] = v.x;
      array[i * 3 + 1] = v.y;
      array[i * 3 + 2] = v.z;
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.0006;
    }
    if (cloudRef.current) {
      cloudRef.current.rotation.y += 0.001; // Independent slow drift
    }
  });

  return (
    <group ref={earthRef} rotation={[0, 0, THREE.MathUtils.degToRad(23.4)]}>
      {/* 1. Core Holographic Frame */}
      <Sphere args={[1, 32, 32]}>
        <meshBasicMaterial 
          color="#00FF41" 
          wireframe 
          transparent 
          opacity={0.08} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>

      {/* 2. Tactical Neural Node Cloud */}
      <points ref={cloudRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={pointsData.length / 3}
            array={pointsData}
            itemSize={3}
            args={[pointsData, 3]}
          />
        </bufferGeometry>
        <pointsMaterial 
          size={0.015} 
          color="#00FF41" 
          transparent 
          opacity={0.6} 
          sizeAttenuation 
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* 3. Atmosphere Halo */}
      <Sphere args={[1.08, 32, 32]}>
        <meshBasicMaterial 
          color="#00FF41"
          transparent 
          opacity={0.04} 
          side={THREE.BackSide} 
          blending={THREE.AdditiveBlending}
        />
      </Sphere>
    </group>
  );
};

const OrbitalRing = ({ radius, rotation, opacity = 0.1 }: { radius: number, rotation: [number, number, number], opacity?: number }) => {
  return (
    <mesh rotation={rotation}>
      <torusGeometry args={[radius, 0.002, 8, 64]} />
      <meshBasicMaterial color="#00FF41" transparent opacity={opacity} blending={THREE.AdditiveBlending} />
    </mesh>
  );
};

const Satellite = ({ 
  orbitRadius, 
  speed, 
  initialAngle, 
  axis = [0, 1, 0] 
}: { 
  orbitRadius: number, 
  speed: number, 
  initialAngle: number,
  axis?: [number, number, number]
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const pingRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [pingActive, setPingActive] = useState(false);
   
  // Parametric position update
  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime() * speed + initialAngle;
      const x = Math.cos(t) * orbitRadius;
      const z = Math.sin(t) * orbitRadius;
      
      // Apply rotation based on orbit axis
      meshRef.current.position.set(x, 0, z);
      meshRef.current.position.applyAxisAngle(new THREE.Vector3(...axis), initialAngle);
    }

    if (pingActive && pingRef.current) {
      pingRef.current.scale.x += 0.05;
      pingRef.current.scale.y += 0.05;
      const material = pingRef.current.material as THREE.MeshBasicMaterial;
      material.opacity -= 0.02;
      
      if (material.opacity <= 0) {
        setPingActive(false);
      }
    }
  });

  const handlePointerOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(true);
    setPingActive(true);
    if (pingRef.current) {
      pingRef.current.scale.set(1, 1, 1);
      (pingRef.current.material as THREE.MeshBasicMaterial).opacity = 1;
    }
  };

  return (
    <group>
      <mesh 
        ref={meshRef} 
        onPointerOver={handlePointerOver}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.5 : 1}
      >
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshBasicMaterial color={hovered ? "var(--color-accent-success)" : "var(--color-accent-primary)"} />
        
        {/* Ping Effect */}
        {pingActive && (
          <mesh ref={pingRef} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[0.03, 0.04, 32]} />
            <meshBasicMaterial color="var(--color-accent-success)" transparent opacity={1} blending={THREE.AdditiveBlending} />
          </mesh>
        )}
      </mesh>
    </group>
  );
};

const DataUplinks = ({ count = 3 }: { count?: number }) => {
  // Random static lines for demo
  const lines = useMemo(() => {
    return Array.from({ length: count }).map(() => {
      const start = new THREE.Vector3().setFromSphericalCoords(1.3, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      const end = new THREE.Vector3().setFromSphericalCoords(1.3, Math.random() * Math.PI, Math.random() * Math.PI * 2);
      return [start, end];
    });
  }, [count]);

  return (
    <group>
      {lines.map((points, i) => (
        <Line 
          key={i} 
          points={points} 
          color="var(--color-accent-primary)" 
          lineWidth={0.5} 
          dashed 
          dashScale={50} 
          dashSize={0.5} 
          dashOffset={0}
          transparent
          opacity={0.3}
        />
      ))}
    </group>
  );
};

// --- Typewriter Headline Component ---

const TypewriterHeadline = () => {
  const fullText = "SATCORP | Tactical Command & Control";
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index <= fullText.length) {
        setDisplayText(fullText.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <div className="headline-overlay">
      <h1 className="typewriter-text">
        {displayText}
        <span className={`cursor ${showCursor ? 'visible' : 'hidden'}`}>_</span>
      </h1>
      <style jsx>{`
        .headline-overlay {
          position: absolute;
          top: 40%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          pointer-events: none;
          text-align: center;
          width: 100%;
        }
.typewriter-text {
  font-family: var(--font-display, 'Orbitron', monospace);
  font-size: clamp(24px, 5vw, 64px);
  font-weight: 900;
  letter-spacing: 0.2em;
  color: var(--color-text-primary, #e8f4f8);
  text-transform: uppercase;
  text-shadow: 0 0 20px rgba(var(--color-accent-primary-rgb), 0.5);
}
        .cursor {
          margin-left: 4px;
          opacity: 1;
        }
        .visible { opacity: 1; }
        .hidden { opacity: 0; }
      `}</style>
    </div>
  );
};

// --- Main HeroGlobe Component ---

export const HeroGlobe = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLowPower, setIsLowPower] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    const updateStates = () => {
      setIsMobile(mobileQuery.matches);
      setPrefersReducedMotion(motionQuery.matches);
      setIsLowPower(navigator.hardwareConcurrency < 4);
    };

    updateStates();
    mobileQuery.addEventListener("change", updateStates);
    motionQuery.addEventListener("change", updateStates);

    return () => {
      mobileQuery.removeEventListener("change", updateStates);
      motionQuery.removeEventListener("change", updateStates);
    };
  }, []);

  // Use static fallback for very low power or accessibility reasons
  if (isLowPower || prefersReducedMotion) {
    return (
      <div className="hero-globe-container">
        <div className="globe-fallback" style={{ zIndex: 1, opacity: 1 }} />
        <TypewriterHeadline />
        <style jsx>{`
          .hero-globe-container {
            position: absolute;
            inset: 0;
            z-index: 0;
            width: 100vw;
            height: 100vh;
            background: #000000;
            overflow: hidden;
          }
          .globe-fallback {
            position: absolute;
            inset: 0;
            background: url('/globe_tactical.png') center/contain no-repeat;
            background-color: #020508;
          }
        `}</style>
      </div>
    );
  }

  // Simplified geometry for mobile optimization
  const segments = isMobile ? 32 : 64;

  return (
    <div className="hero-globe-container">
      <Suspense fallback={<div className="globe-fallback" />}>
        <Canvas 
          gl={{ antialias: !isMobile, alpha: true, powerPreference: "high-performance" }} 
          camera={{ position: [0, -0.1, 2.5], fov: 45 }}
          style={{ background: 'transparent' }}
          dpr={isMobile ? [1, 1.5] : [1, 2]}
        >
          <color attach="background" args={["#000000"]} />
          
          <ambientLight intensity={0.1} />
          <directionalLight position={[5, 3, 5]} intensity={1.5} color="#ffffff" />
          
          <Earth segments={segments} />
          
          {/* Orbital Rings - HIDDEN ON MOBILE */}
          {!isMobile && (
            <>
              <OrbitalRing radius={1.4} rotation={[Math.PI / 4, 0, 0]} />
              <OrbitalRing radius={1.6} rotation={[Math.PI / -6, Math.PI / 4, 0]} />
              <OrbitalRing radius={1.8} rotation={[0, Math.PI / 3, 0]} />
            </>
          )}
          
          {/* Satellites - REDUCED ON MOBILE */}
          <Satellite orbitRadius={1.4} speed={0.2} initialAngle={0} axis={[1, 1, 0]} />
          {!isMobile && <Satellite orbitRadius={1.4} speed={0.15} initialAngle={2} axis={[1, 1, 0]} />}
          <Satellite orbitRadius={1.6} speed={0.1} initialAngle={1} axis={[0, 1, 1]} />
          {!isMobile && <Satellite orbitRadius={1.6} speed={0.25} initialAngle={4} axis={[0, 1, 1]} />}
          <Satellite orbitRadius={1.8} speed={0.08} initialAngle={3} axis={[0, 1, 0]} />
          {!isMobile && <Satellite orbitRadius={1.8} speed={0.12} initialAngle={5} axis={[0, 1, 0]} />}
          
          {/* Active Data Uplinks - HIDDEN ON MOBILE */}
          {!isMobile && <DataUplinks count={4} />}

          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            autoRotate={false} 
            minPolarAngle={Math.PI / 2.5}
            maxPolarAngle={Math.PI / 1.5}
          />
        </Canvas>
      </Suspense>
      
      <TypewriterHeadline />

      <style jsx>{`
        .hero-globe-container {
          position: absolute;
          inset: 0;
          z-index: 0;
          width: 100vw;
          height: 100vh;
          background: #000000;
          overflow: hidden;
        }
        .globe-fallback {
          position: absolute;
          inset: 0;
          background: url('/globe_tactical.png') center/contain no-repeat;
          background-color: #020508;
          opacity: 1;
          z-index: -1;
        }
      `}</style>
    </div>
  );
};
