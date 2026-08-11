'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment, MeshReflectorMaterial } from '@react-three/drei';
import * as THREE from 'three';

/* ───────────────────────────────────────────
   Realistic 3D Sports Objects with PBR Materials
   ─────────────────────────────────────────── */

function Basketball({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.2;
    meshRef.current.rotation.y += delta * 0.35;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow receiveShadow>
        <sphereGeometry args={[0.5, 64, 64]} />
        <meshPhysicalMaterial
          color="#c45e1a"
          roughness={0.82}
          metalness={0.0}
          clearcoat={0.15}
          clearcoatRoughness={0.6}
          envMapIntensity={0.4}
        />
        {/* Realistic seam lines */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.502, 0.012, 8, 64]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} metalness={0.0} />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.502, 0.012, 8, 64]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} metalness={0.0} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.502, 0.012, 8, 64]} />
          <meshPhysicalMaterial color="#1a1a1a" roughness={0.9} metalness={0.0} />
        </mesh>
      </mesh>
    </Float>
  );
}

function Football({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.z += delta * 0.25;
    meshRef.current.rotation.x += delta * 0.15;
  });

  const pentagonPositions = useMemo(() => {
    const positions: [number, number, number][] = [];
    const r = 0.52;
    for (let i = 0; i < 6; i++) {
      const phi = Math.acos(-1 + (2 * i) / 5);
      const theta = Math.sqrt(5 * Math.PI) * phi;
      positions.push([r * Math.cos(theta) * Math.sin(phi), r * Math.sin(theta) * Math.sin(phi), r * Math.cos(phi)]);
    }
    return positions;
  }, []);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.0}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[0.48, 64, 64]} />
          <meshPhysicalMaterial
            color="#f0f0f0"
            roughness={0.45}
            metalness={0.0}
            clearcoat={0.2}
            clearcoatRoughness={0.5}
            envMapIntensity={0.5}
          />
        </mesh>
        {pentagonPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshPhysicalMaterial color="#111111" roughness={0.6} metalness={0.0} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Shuttlecock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.x += delta * 0.15;
    groupRef.current.rotation.z += delta * 0.25;
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.4}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Cork base - natural cork texture */}
        <mesh position={[0, -0.15, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.12, 32, 32]} />
          <meshPhysicalMaterial
            color="#b8915a"
            roughness={0.95}
            metalness={0.0}
            envMapIntensity={0.2}
          />
        </mesh>
        {/* Feather cone - translucent white */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <coneGeometry args={[0.3, 0.6, 24, 1, true]} />
          <meshPhysicalMaterial
            color="#f5f2e8"
            roughness={0.4}
            metalness={0.0}
            transmission={0.15}
            thickness={0.3}
            side={THREE.DoubleSide}
            transparent
            opacity={0.92}
            envMapIntensity={0.3}
          />
        </mesh>
      </group>
    </Float>
  );
}

function TableTennisPaddle({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.35;
    groupRef.current.rotation.x += delta * 0.1;
  });

  return (
    <Float speed={1.6} rotationIntensity={0.5} floatIntensity={1.0}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Paddle face - rubber surface */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 48]} />
          <meshPhysicalMaterial
            color="#9a1f1f"
            roughness={0.75}
            metalness={0.0}
            clearcoat={0.1}
            clearcoatRoughness={0.8}
            envMapIntensity={0.3}
          />
        </mesh>
        {/* Handle - polished wood */}
        <mesh position={[0, 0, -0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.4, 16]} />
          <meshPhysicalMaterial
            color="#6b3a1f"
            roughness={0.5}
            metalness={0.05}
            clearcoat={0.4}
            clearcoatRoughness={0.3}
            envMapIntensity={0.4}
          />
        </mesh>
        {/* Ping pong ball - matte celluloid */}
        <mesh position={[0.4, 0.15, 0.1]} castShadow receiveShadow>
          <sphereGeometry args={[0.08, 32, 32]} />
          <meshPhysicalMaterial
            color="#ff8c00"
            roughness={0.35}
            metalness={0.0}
            clearcoat={0.6}
            clearcoatRoughness={0.15}
            envMapIntensity={0.6}
          />
        </mesh>
      </group>
    </Float>
  );
}

function ChessPiece({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.3} floatIntensity={0.8}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Base - polished dark stone */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.08, 32]} />
          <meshPhysicalMaterial
            color="#1a1a1a"
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            envMapIntensity={1.0}
          />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.25, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.12, 0.18, 0.4, 24]} />
          <meshPhysicalMaterial
            color="#111111"
            roughness={0.15}
            metalness={0.85}
            clearcoat={0.8}
            clearcoatRoughness={0.1}
            envMapIntensity={1.0}
          />
        </mesh>
        {/* Crown head - metallic gold */}
        <mesh position={[0, 0.52, 0]} castShadow receiveShadow>
          <sphereGeometry args={[0.14, 32, 32]} />
          <meshPhysicalMaterial
            color="#d4a017"
            roughness={0.1}
            metalness={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            envMapIntensity={1.2}
          />
        </mesh>
        {/* Cross on top */}
        <mesh position={[0, 0.72, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.04, 0.12, 0.04]} />
          <meshPhysicalMaterial
            color="#d4a017"
            roughness={0.1}
            metalness={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
        <mesh position={[0, 0.68, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 0.04, 0.04]} />
          <meshPhysicalMaterial
            color="#d4a017"
            roughness={0.1}
            metalness={0.95}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
          />
        </mesh>
      </group>
    </Float>
  );
}

function Trophy3D({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.3;
  });

  return (
    <Float speed={1.0} rotationIntensity={0.2} floatIntensity={0.7}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Trophy Base - polished gold */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.1, 32]} />
          <meshPhysicalMaterial
            color="#b8860b"
            roughness={0.08}
            metalness={0.98}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            envMapIntensity={1.5}
          />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 16]} />
          <meshPhysicalMaterial
            color="#c49b08"
            roughness={0.08}
            metalness={0.98}
            clearcoat={1.0}
            clearcoatRoughness={0.03}
            envMapIntensity={1.5}
          />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.25, 0.1, 0.4, 32, 1, true]} />
          <meshPhysicalMaterial
            color="#ffd700"
            roughness={0.06}
            metalness={0.98}
            clearcoat={1.0}
            clearcoatRoughness={0.02}
            envMapIntensity={1.8}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Handles */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.32, 0.48, 0]} rotation={[0, 0, side * 0.3]} castShadow receiveShadow>
            <torusGeometry args={[0.1, 0.025, 12, 24, Math.PI]} />
            <meshPhysicalMaterial
              color="#ffd700"
              roughness={0.06}
              metalness={0.98}
              clearcoat={1.0}
              clearcoatRoughness={0.02}
              envMapIntensity={1.8}
            />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

/* ─────────────────────
   Particle "Stars" Dust
   ───────────────────── */
function ParticleDust({ count = 60 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return arr;
  }, [count]);

  useFrame((_, delta) => {
    pointsRef.current.rotation.y += delta * 0.015;
  });

  const bufferAttr = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#fbbf24" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
}

/* ──────────────────────────────
   Main Exported 3D Scene Canvas
   ────────────────────────────── */
export function SportsScene3D() {
  return (
    <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 50 }}
        gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        shadows
      >
        {/* Realistic multi-source lighting */}
        <ambientLight intensity={0.3} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#fff5e1"
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <directionalLight position={[-4, 3, -3]} intensity={0.5} color="#7dd3fc" />
        <pointLight position={[0, 4, 3]} intensity={0.6} color="#fbbf24" decay={2} />
        <pointLight position={[-3, -2, 2]} intensity={0.3} color="#fb923c" decay={2} />

        {/* Sports Objects spread across the viewport */}
        <Basketball position={[3.2, 1.2, 0]} scale={0.9} />
        <Football position={[-3.5, -0.8, -1]} scale={0.85} />
        <Shuttlecock position={[2.8, -1.5, 0.5]} scale={1.1} />
        <TableTennisPaddle position={[-2.8, 1.5, -0.5]} scale={0.8} />
        <ChessPiece position={[-1.5, -1.8, 0]} scale={0.7} />
        <Trophy3D position={[0.5, 2.2, -1]} scale={0.65} />

        <ParticleDust count={80} />

        {/* HDR environment for realistic reflections */}
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
