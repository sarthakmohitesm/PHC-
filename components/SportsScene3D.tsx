'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

/* ───────────────────────────────────────────
   3D Geometry Primitives for Sports Objects
   ─────────────────────────────────────────── */

function Basketball({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta * 0.3;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <Float speed={2.5} rotationIntensity={0.6} floatIntensity={1.8}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <sphereGeometry args={[0.5, 32, 32]} />
        <meshStandardMaterial
          color="#e67e22"
          roughness={0.7}
          metalness={0.1}
          emissive="#c0392b"
          emissiveIntensity={0.15}
        />
        {/* Black seam lines as a torus ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.5, 0.015, 8, 48]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[0.5, 0.015, 8, 48]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]}>
          <torusGeometry args={[0.5, 0.015, 8, 48]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </mesh>
    </Float>
  );
}

function Football({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((_, delta) => {
    meshRef.current.rotation.z += delta * 0.4;
    meshRef.current.rotation.x += delta * 0.25;
  });

  // Pentagon patches on the football
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
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.6}>
      <group ref={meshRef} position={position} scale={scale}>
        <mesh castShadow>
          <sphereGeometry args={[0.48, 32, 32]} />
          <meshStandardMaterial color="#f5f5f5" roughness={0.5} metalness={0.05} />
        </mesh>
        {pentagonPositions.map((pos, i) => (
          <mesh key={i} position={pos}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#1a1a1a" flatShading />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function Shuttlecock({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.x += delta * 0.2;
    groupRef.current.rotation.z += delta * 0.35;
  });

  return (
    <Float speed={3} rotationIntensity={1.2} floatIntensity={2}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Cork base */}
        <mesh position={[0, -0.15, 0]} castShadow>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#d4a76a" roughness={0.8} />
        </mesh>
        {/* Feather cone */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <coneGeometry args={[0.3, 0.6, 16, 1, true]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.3}
            metalness={0.05}
            side={THREE.DoubleSide}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  );
}

function TableTennisPaddle({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.5;
    groupRef.current.rotation.x += delta * 0.15;
  });

  return (
    <Float speed={2.2} rotationIntensity={0.7} floatIntensity={1.5}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Paddle face */}
        <mesh castShadow>
          <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
          <meshStandardMaterial color="#c0392b" roughness={0.6} metalness={0.1} />
        </mesh>
        {/* Handle */}
        <mesh position={[0, 0, -0.35]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.07, 0.4, 12]} />
          <meshStandardMaterial color="#8B4513" roughness={0.9} />
        </mesh>
        {/* Ping pong ball nearby */}
        <mesh position={[0.4, 0.15, 0.1]} castShadow>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ff9500" emissive="#ff6600" emissiveIntensity={0.3} roughness={0.3} />
        </mesh>
      </group>
    </Float>
  );
}

function ChessPiece({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.6;
  });

  return (
    <Float speed={1.8} rotationIntensity={0.4} floatIntensity={1.2}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.2, 0.25, 0.08, 24]} />
          <meshStandardMaterial color="#2c2c2c" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.12, 0.18, 0.4, 16]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Crown head */}
        <mesh position={[0, 0.52, 0]} castShadow>
          <sphereGeometry args={[0.14, 16, 16]} />
          <meshStandardMaterial color="#f0c040" roughness={0.2} metalness={0.9} emissive="#d4a017" emissiveIntensity={0.2} />
        </mesh>
        {/* Cross on top */}
        <mesh position={[0, 0.72, 0]} castShadow>
          <boxGeometry args={[0.04, 0.12, 0.04]} />
          <meshStandardMaterial color="#f0c040" roughness={0.2} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.68, 0]} castShadow>
          <boxGeometry args={[0.1, 0.04, 0.04]} />
          <meshStandardMaterial color="#f0c040" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
    </Float>
  );
}

function Trophy3D({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((_, delta) => {
    groupRef.current.rotation.y += delta * 0.4;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Trophy Base */}
        <mesh castShadow>
          <cylinderGeometry args={[0.25, 0.3, 0.1, 24]} />
          <meshStandardMaterial color="#c8a200" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* Stem */}
        <mesh position={[0, 0.2, 0]} castShadow>
          <cylinderGeometry args={[0.06, 0.08, 0.3, 12]} />
          <meshStandardMaterial color="#d4a600" roughness={0.2} metalness={0.95} />
        </mesh>
        {/* Cup */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.25, 0.1, 0.4, 24, 1, true]} />
          <meshStandardMaterial
            color="#ffd700"
            roughness={0.15}
            metalness={0.95}
            emissive="#b8860b"
            emissiveIntensity={0.3}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* Handles */}
        {[-1, 1].map((side) => (
          <mesh key={side} position={[side * 0.32, 0.48, 0]} rotation={[0, 0, side * 0.3]} castShadow>
            <torusGeometry args={[0.1, 0.025, 8, 16, Math.PI]} />
            <meshStandardMaterial color="#ffd700" roughness={0.15} metalness={0.95} />
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
    pointsRef.current.rotation.y += delta * 0.02;
  });

  const bufferAttr = useMemo(() => {
    return new THREE.BufferAttribute(positions, 3);
  }, [positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={bufferAttr} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#fbbf24" transparent opacity={0.6} sizeAttenuation />
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
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1.2} color="#fcd34d" />
        <directionalLight position={[-3, 2, -3]} intensity={0.4} color="#34d399" />
        <pointLight position={[0, 3, 2]} intensity={0.8} color="#f59e0b" />

        {/* Sports Objects spread across the viewport */}
        <Basketball position={[3.2, 1.2, 0]} scale={0.9} />
        <Football position={[-3.5, -0.8, -1]} scale={0.85} />
        <Shuttlecock position={[2.8, -1.5, 0.5]} scale={1.1} />
        <TableTennisPaddle position={[-2.8, 1.5, -0.5]} scale={0.8} />
        <ChessPiece position={[-1.5, -1.8, 0]} scale={0.7} />
        <Trophy3D position={[0.5, 2.2, -1]} scale={0.65} />

        <ParticleDust count={80} />

        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
