import React from 'react';
import { Scene } from './components/Scene';
import { GameHUD } from './components/ui/GameHUD';
import { LandingPage } from './components/ui/LandingPage';
import AvatarCustomizer from './components/Avatar/AvatarCustomizer';
import { useGameStore } from './store/gameStore';

function App() {
  const isPlaying = useGameStore((state) => state.isPlaying);

  return isPlaying ? (
    <div className="relative w-full h-screen">
      <AvatarCustomizer />
      <Scene />
      <GameHUD />
    </div>
  ) : (
    <LandingPage />
  );
}

export default App;