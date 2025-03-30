import React, { useRef } from 'react';
import { Mesh } from 'three';
// import { useFrame } from '@react-three/fiber'; // Removed unused import

interface TableProps {
  castShadow?: boolean;
  receiveShadow?: boolean;
}

export function Table({ castShadow = false, receiveShadow = false }: TableProps) {
  const meshRef = useRef<Mesh>(null);

  // Removed the rotation for now to focus on shadows
  // useFrame((state, delta) => {
  //   if (meshRef.current) {
  //     meshRef.current.rotation.y += delta * 0.2;
  //   }
  // });

  return (
    <mesh 
      ref={meshRef} 
      position={[0, -0.1, 0]} // Lowered slightly
      castShadow={castShadow}
      receiveShadow={receiveShadow}
    >
      <boxGeometry args={[3, 0.2, 3]} /> {/* Made slightly larger */}
      <meshStandardMaterial color="#8B4513" />
    </mesh>
  );
}