"use client";
import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sphere, Environment, AdaptiveDpr, AdaptiveEvents } from "@react-three/drei";
import * as THREE from "three";

function AmorphousShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={4} rotationIntensity={1} floatIntensity={2}>
      <Sphere ref={meshRef} args={[1, 100, 100]} scale={2.4}>
        <MeshDistortMaterial
          color="#4287f5"
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.1}
          transmission={0.4}
        />
      </Sphere>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-60">
      <Canvas 
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
      >
        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <AmorphousShape />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
