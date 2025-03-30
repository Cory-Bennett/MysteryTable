import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useAvatarStore } from './avatarStore';

const AvatarModel: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  const { color } = useAvatarStore(); // Get color from the store

  // Simple animation example
  useFrame((_state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  // Update material color when the store changes
  React.useEffect(() => {
    if (meshRef.current) {
      (meshRef.current.material as THREE.MeshStandardMaterial).color.set(color);
    }
  }, [color]);

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
      {/* Using a simple Box for now, replace with actual model later */}
      <boxGeometry args={[0.5, 1, 0.5]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
};

export default AvatarModel; 