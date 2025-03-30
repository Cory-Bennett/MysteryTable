import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Table } from './models/Table';

export function Scene() {
  return (
    <Canvas
      camera={{ position: [5, 5, 5], fov: 75 }}
      style={{ height: '100vh' }}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <Environment preset="sunset" />
      <Table />
      <OrbitControls />
    </Canvas>
  );
}