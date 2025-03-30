import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Table } from './models/Table';
import AvatarModel from './Avatar/AvatarModel';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 75 }}
      style={{ height: '100vh' }}
      shadows
    >
      <ambientLight intensity={0.5} />
      <directionalLight 
        position={[10, 10, 5]} 
        intensity={1} 
        castShadow
      />
      <Environment preset="sunset" />
      <Table receiveShadow />
      <AvatarModel />
      <OrbitControls />
    </Canvas>
  );
}