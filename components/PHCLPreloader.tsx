'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, useTexture } from '@react-three/drei';
import { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';

interface PHCLPreloaderProps {
  visible: boolean;
  onComplete?: () => void;
  durationMs?: number;
}

const ORANGE = '#E87A2D';
const AMBER = '#fbbf24';
const SILVER = '#dfe7ef';
const DEEP_NAVY = '#050A16';
const LOGO_PATH = '/PHCL%20season%205%20.png';

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

const smoothStep = (edge0: number, edge1: number, value: number) => {
  const t = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
};

function usePrefersReducedMotion() {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(media.matches);

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reducedMotion;
}

function useParticleBudget() {
  const [count, setCount] = useState(3200);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCount(window.innerWidth < 768 ? 1200 : 4200);
  }, []);

  return count;
}

function SportsObject({
  progress,
  kind,
  index,
  reducedMotion,
}: {
  progress: number;
  kind: 'football' | 'basketball' | 'cricket' | 'shuttle' | 'chess';
  index: number;
  reducedMotion: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!ref.current) return;

    const time = state.clock.getElapsedTime();
    const p = progress;
    const xBase = {
      football: -5.6,
      basketball: 5.8,
      cricket: -3.6,
      shuttle: 4.3,
      chess: 0,
    }[kind];

    const dynamic = {
      football: smoothStep(0.12, 0.34, p),
      basketball: smoothStep(0.22, 0.46, p),
      cricket: smoothStep(0.32, 0.55, p),
      shuttle: smoothStep(0.44, 0.68, p),
      chess: smoothStep(0.52, 0.74, p),
    }[kind];

    const moveX = THREE.MathUtils.lerp(xBase, 0, dynamic);
    const moveY =
      kind === 'shuttle'
        ? 1.2 + Math.sin(time * 2.2 + index) * 0.9
        : kind === 'cricket'
          ? Math.sin(time * 3.4 + index) * 0.35
          : Math.sin(time * 1.8 + index * 1.7) * 0.35;

    const z = kind === 'football' ? 0.8 : kind === 'basketball' ? -0.5 : kind === 'cricket' ? 1.2 : kind === 'shuttle' ? -0.8 : 0.6;

    ref.current.position.set(
      moveX + (kind === 'football' ? Math.sin(time * 2.5) * 0.4 : 0),
      moveY,
      z
    );

    ref.current.rotation.x += 0.04 + index * 0.006;
    ref.current.rotation.y += 0.06 + index * 0.01;
    ref.current.rotation.z += 0.02 + index * 0.005;

    if (kind === 'basketball') {
      ref.current.rotation.z += Math.sin(time * 2.1) * 0.05;
    }

    if (kind === 'shuttle') {
      ref.current.rotation.z += 0.08;
    }

    const scale = reducedMotion ? 0.68 : 0.88 + dynamic * 0.5;
    ref.current.scale.setScalar(scale);
  });

  const sharedMaterial = { metalness: 0.7, roughness: 0.45 };

  return (
    <group ref={ref}>
      {kind === 'football' && (
        <>
          <mesh>
            <sphereGeometry args={[0.7, 48, 48]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.35} />
          </mesh>
          <mesh position={[0, 0, 0.01]}>
            <sphereGeometry args={[0.71, 24, 24]} />
            <meshBasicMaterial color="#0b1220" transparent opacity={0.22} />
          </mesh>
        </>
      )}

      {kind === 'basketball' && (
        <>
          <mesh>
            <sphereGeometry args={[0.62, 42, 42]} />
            <meshStandardMaterial color="#f97316" metalness={0.55} roughness={0.38} emissive={ORANGE} emissiveIntensity={0.18} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.64, 0.02, 8, 44]} />
            <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.4} />
          </mesh>
          <mesh rotation={[0, Math.PI / 2, 0]}>
            <torusGeometry args={[0.64, 0.02, 8, 44]} />
            <meshStandardMaterial color="#111827" metalness={0.5} roughness={0.4} />
          </mesh>
        </>
      )}

      {kind === 'cricket' && (
        <mesh>
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial color="#b91c1c" metalness={0.7} roughness={0.25} emissive="#7f1d1d" emissiveIntensity={0.3} />
        </mesh>
      )}

      {kind === 'shuttle' && (
        <group>
          <mesh position={[0, 0.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[0.15, 0.9, 18]} />
            <meshStandardMaterial color="#e2e8f0" metalness={1} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0.42, 0]}>
            <sphereGeometry args={[0.14, 18, 18]} />
            <meshStandardMaterial color="#f8fafc" metalness={0.8} roughness={0.2} />
          </mesh>
          {Array.from({ length: 6 }).map((_, featherIndex) => (
            <mesh key={featherIndex} position={[0, 0.2 + featherIndex * 0.06, -0.16 + featherIndex * 0.04]} rotation={[0, featherIndex * (Math.PI / 3), 0.7]}>
              <coneGeometry args={[0.08, 0.52, 8]} />
              <meshStandardMaterial color={featherIndex % 2 === 0 ? '#f8fafc' : '#fbbf24'} metalness={0.5} roughness={0.45} emissive={ORANGE} emissiveIntensity={0.15} />
            </mesh>
          ))}
        </group>
      )}

      {kind === 'chess' && (
        <group>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.12, 0.18, 0.7, 24]} />
            <meshStandardMaterial color={SILVER} metalness={1} roughness={0.2} emissive={ORANGE} emissiveIntensity={0.2} />
          </mesh>
          <mesh position={[0, 0.95, 0]}>
            <coneGeometry args={[0.22, 0.42, 20]} />
            <meshStandardMaterial color={SILVER} metalness={1} roughness={0.18} emissive={ORANGE} emissiveIntensity={0.25} />
          </mesh>
        </group>
      )}
    </group>
  );
}

function VortexParticles({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = useParticleBudget();

  const basePositions = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      const radius = 0.5 + Math.random() * 4.8;
      const theta = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 3.5;
      arr[i * 3] = radius * Math.cos(theta);
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = radius * Math.sin(theta);
    }

    return arr;
  }, [particleCount]);

  const colors = useMemo(() => {
    const arr = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const strong = Math.random();
      arr[i * 3] = strong > 0.8 ? 1 : 0.96;
      arr[i * 3 + 1] = strong > 0.8 ? 0.85 : 0.62;
      arr[i * 3 + 2] = strong > 0.8 ? 0.38 : 0.18;
    }
    return arr;
  }, [particleCount]);

  const geometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(basePositions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    return geometry;
  }, [basePositions, colors]);

  useFrame((state) => {
    if (!pointsRef.current) return;

    const time = state.clock.getElapsedTime();
    const arr = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const p = clamp((progress - 0.7) / 0.24, 0, 1);

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;
      const theta = Math.atan2(basePositions[idx + 2], basePositions[idx]) + time * (0.6 + (i % 7) * 0.08);
      const radius = 0.4 + Math.hypot(basePositions[idx], basePositions[idx + 2]) * (0.9 - p * 0.55) + Math.sin(time * 2 + i) * 0.08;

      arr[idx] = Math.cos(theta) * radius;
      arr[idx + 1] = basePositions[idx + 1] * (1 + p * 0.2) + Math.sin(time * 2.3 + i) * 0.12;
      arr[idx + 2] = Math.sin(theta) * radius;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y += (reducedMotion ? 0.12 : 0.38) * (0.5 + p);
    pointsRef.current.rotation.x = Math.sin(time * 0.5) * 0.5;
    pointsRef.current.rotation.z = Math.cos(time * 0.4) * 0.4;
  });

  return (
    <points ref={pointsRef} geometry={geometry}>
      <pointsMaterial
        size={reducedMotion ? 0.055 : 0.07}
        vertexColors
        transparent
        opacity={0.95}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

function LogoReveal({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const texture = useTexture(LOGO_PATH);
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const planeRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    return () => {
      texture.dispose();
    };
  }, [texture]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const reveal = smoothStep(0.7, 0.9, progress);
    const scale = 0.68 + reveal * 0.75;

    if (groupRef.current) {
      groupRef.current.scale.setScalar(scale);
      groupRef.current.rotation.y = Math.sin(t * 0.6) * 0.18;
      groupRef.current.position.z = -0.5 + reveal * 0.7;
    }

    if (glowRef.current) {
      const glowOpacity = 0.2 + reveal * 0.7;
      const material = glowRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = glowOpacity;
    }

    if (planeRef.current) {
      const material = planeRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.2 + reveal * 0.95;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.05, 0]}>
      <mesh ref={glowRef} position={[0, 0, -0.2]}>
        <planeGeometry args={[5.2, 3.2, 1, 1]} />
        <meshBasicMaterial color={ORANGE} transparent opacity={0.18} />
      </mesh>

      <mesh ref={planeRef} position={[0, 0, 0]}>
        <planeGeometry args={[4.2, 2.7, 1, 1]} />
        <meshBasicMaterial
          map={texture}
          transparent
          depthWrite={false}
          opacity={0.2}
          toneMapped={false}
        />
      </mesh>

      {reducedMotion ? null : (
        <Sparkles
          count={120}
          scale={[6, 3.5, 2]}
          size={2.8}
          speed={0.7}
          color={ORANGE}
          position={[0, 0, 0.8]}
          opacity={0.8}
        />
      )}
    </group>
  );
}

function PreloaderScene({ progress, reducedMotion }: { progress: number; reducedMotion: boolean }) {
  const cameraRef = useRef<THREE.PerspectiveCamera>(null);
  const swirlRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!cameraRef.current) return;

    const t = state.clock.getElapsedTime();
    const p = clamp(progress, 0, 1);
    const z = 9.1 - p * 2.2;
    cameraRef.current.position.z = z;
    cameraRef.current.position.x = Math.sin(t * 0.45) * (0.2 + p * 0.3);
    cameraRef.current.position.y = Math.cos(t * 0.7) * (0.15 + p * 0.25);
    cameraRef.current.lookAt(0, 0, 0);

    if (swirlRef.current) {
      swirlRef.current.rotation.y += delta * (reducedMotion ? 0.12 : 0.28);
      swirlRef.current.rotation.z = Math.sin(t * 0.7) * 0.18;
    }
  });

  return (
    <>
      <color attach="background" args={[DEEP_NAVY]} />
      <fog attach="fog" args={[DEEP_NAVY, 8, 18]} />

      <ambientLight intensity={0.5} color="#dbeafe" />
      <directionalLight position={[5, 5, 6]} intensity={1.5} color="#ffffff" />
      <pointLight position={[0, 0, 5]} intensity={18} color={ORANGE} distance={26} />
      <pointLight position={[3, 2, -2]} intensity={8} color="#ffd6a5" distance={18} />
      <pointLight position={[-4, -1, 2]} intensity={4} color="#93c5fd" distance={18} />

      <group ref={swirlRef}>
        <VortexParticles progress={progress} reducedMotion={reducedMotion} />
      </group>

      <Sparkles count={reducedMotion ? 80 : 180} scale={[10, 6, 6]} size={2.6} speed={0.8} color={ORANGE} opacity={0.8} />

      <group>
        <SportsObject kind="football" index={1} progress={progress} reducedMotion={reducedMotion} />
        <SportsObject kind="basketball" index={2} progress={progress} reducedMotion={reducedMotion} />
        <SportsObject kind="cricket" index={3} progress={progress} reducedMotion={reducedMotion} />
        <SportsObject kind="shuttle" index={4} progress={progress} reducedMotion={reducedMotion} />
        <SportsObject kind="chess" index={5} progress={progress} reducedMotion={reducedMotion} />
      </group>

      <LogoReveal progress={progress} reducedMotion={reducedMotion} />

      <mesh position={[0, -2.7, -2]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[8, 64]} />
        <meshBasicMaterial color="#040b16" transparent opacity={0.28} />
      </mesh>
    </>
  );
}

export function PHCLPreloader({ visible, onComplete, durationMs = 9000 }: PHCLPreloaderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!visible) return;

    setMounted(true);
    const start = performance.now();
    let rafId = 0;

    const tick = () => {
      const elapsed = performance.now() - start;
      const nextProgress = clamp(elapsed / durationMs, 0, 1);
      setProgress(nextProgress);

      if (nextProgress < 1) {
        rafId = requestAnimationFrame(tick);
      } else if (onComplete) {
        onComplete();
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [durationMs, onComplete, visible]);

  useEffect(() => {
    if (!visible && mounted) {
      const timer = window.setTimeout(() => setMounted(false), 700);
      return () => window.clearTimeout(timer);
    }
  }, [mounted, visible]);

  if (!mounted && !visible) return null;

  return (
    <div
      className={[
        'fixed inset-0 z-[100] overflow-hidden transition-opacity duration-700 ease-out',
        visible ? 'opacity-100' : 'opacity-0 pointer-events-none',
      ].join(' ')}
      style={{
        background: 'radial-gradient(circle at center, rgba(17,24,39,0.94) 0%, rgba(5,10,22,1) 50%, rgba(2,6,23,1) 100%)',
      }}
    >
      <div className="absolute inset-0 opacity-80" style={{ backgroundImage: 'radial-gradient(circle at center, rgba(232,122,45,0.10), transparent 24%, rgba(255,255,255,0.02) 50%, transparent 100%)' }} />

      <Canvas
        dpr={reducedMotion ? [1, 1.4] : [1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        camera={{ position: [0, 0, 9], fov: 32 }}
      >
        <PreloaderScene progress={progress} reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  );
}
