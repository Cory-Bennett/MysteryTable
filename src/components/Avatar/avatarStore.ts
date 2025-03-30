import { create } from 'zustand';

interface AvatarState {
  color: string;
  setColor: (color: string) => void;
  // Add more state properties here later (e.g., position, accessories)
}

export const useAvatarStore = create<AvatarState>((set) => ({
  color: '#ffffff', // Default color
  setColor: (newColor) => set({ color: newColor }),
})); 