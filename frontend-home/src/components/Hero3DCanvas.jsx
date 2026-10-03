import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Circular Marble & Gold Podium Component
function MarblePodium() {
  const innerRingRef = useRef();

  useFrame((state, delta) => {
    if (innerRingRef.current) {
      innerRingRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <group position={[0, -2.2, 0]}>
      {/* Main Base Marble Podium Cylinder */}
      <mesh receiveShadow position={[0, 0, 0]}>
        <cylinderGeometry args={[3.2, 3.5, 0.6, 64]} />
        <meshStandardMaterial
          color="#e8e4dc"
          roughness={0.2}
          metalness={0.1}
        />
      </mesh>

      {/* Gold Metallic Rim Accent */}
      <mesh ref={innerRingRef} position={[0, 0.32, 0]}>
        <cylinderGeometry args={[2.9, 2.9, 0.08, 64]} />
        <meshStandardMaterial
          color="#d4af37"
          metalness={0.9}
          roughness={0.15}
        />
      </mesh>

      {/* Inner Marble Inlay */}
      <mesh position={[0, 0.37, 0]}>
        <cylinderGeometry args={[2.7, 2.7, 0.04, 64]} />
        <meshStandardMaterial
          color="#f5f2eb"
          roughness={0.1}
          metalness={0.05}
        />
      </mesh>
    </group>
  );
}

// 3D Floating Waving Fabric Mesh
function WavingClothMesh({ position, color, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime() * speed;
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(t * 0.5) * 0.2;
      meshRef.current.rotation.z = Math.cos(t * 0.3) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(t) * 0.15;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} castShadow>
        <planeGeometry args={[1.8, 2.6, 16, 16]} />
        <meshStandardMaterial
          color={color}
          roughness={0.25}
          metalness={0.3}
          side={THREE.DoubleSide}
        />
      </mesh>
    </Float>
  );
}

// 3D Floating Garments Group
function Floating3DOutfit({ scrollProgress = 0 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.3 + scrollProgress * 0.02;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      {/* Central Silk Gown Drapery (Champagne Gold Silk) */}
      <WavingClothMesh position={[-0.9, 0.3, 0.2]} color="#d4af37" speed={1.2} />

      {/* Floating Tailored Obsidian Blazer (Midnight Velvet) */}
      <WavingClothMesh position={[0.9, 0.1, -0.2]} color="#18181b" speed={0.9} />

      {/* Floating Silk Swatch (Royal Emerald) */}
      <WavingClothMesh position={[0, 1.2, -0.8]} color="#065f46" speed={1.4} />

      {/* Floating Metallic Orb Accents */}
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[1.8, 1.4, 0.6]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#d4af37" metalness={0.95} roughness={0.1} />
        </mesh>
      </Float>

      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[-1.7, -0.6, 0.5]}>
          <octahedronGeometry args={[0.28]} />
          <meshStandardMaterial color="#e5c158" metalness={0.9} roughness={0.15} />
        </mesh>
      </Float>
    </group>
  );
}

export default function Hero3DCanvas({ scrollProgress = 0 }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{ position: [0, 0.5, 6.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.9} color="#fff8e7" />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.8}
          color="#fff4d6"
          castShadow
        />
        <pointLight position={[-4, 3, -2]} intensity={1.2} color="#d4af37" />

        <MarblePodium />
        <Floating3DOutfit scrollProgress={scrollProgress} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 2 + 0.1}
          minPolarAngle={Math.PI / 3}
          rotateSpeed={0.4}
        />
      </Canvas>
    </div>
  );
}
