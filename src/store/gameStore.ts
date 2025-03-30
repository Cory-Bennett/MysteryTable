import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { Case, Evidence, Suspect } from '../types/case';

export interface Player {
  id: string;
  name: string;
  isHost: boolean;
  position?: { x: number; y: number; z: number };
  collectedEvidence: string[]; // Evidence IDs
  notes: Array<{
    id: string;
    text: string;
    timestamp: number;
    relatedEvidence?: string[];
    relatedSuspects?: string[];
  }>;
}

interface GameState {
  isPlaying: boolean;
  currentCase: Case | null;
  playerId: string;
  playerName: string;
  players: Map<string, Player>;
  messages: Array<{ id: string; playerId: string; text: string; timestamp: number }>;
  
  // Case management
  startCase: (caseId: string) => void;
  endCase: (solved: boolean) => void;
  collectEvidence: (evidenceId: string) => void;
  addNote: (text: string, relatedEvidence?: string[], relatedSuspects?: string[]) => void;
  
  // Player management
  setIsPlaying: (isPlaying: boolean) => void;
  setPlayerName: (name: string) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (playerId: string) => void;
  updatePlayerPosition: (playerId: string, position: { x: number; y: number; z: number }) => void;
  addMessage: (playerId: string, text: string) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  isPlaying: false,
  currentCase: null,
  playerId: uuidv4(),
  playerName: '',
  players: new Map(),
  messages: [],
  
  startCase: (caseId: string) => set((state) => {
    const newCase: Case = {
      id: caseId,
      title: 'The Missing Artifact',
      description: 'A valuable artifact has disappeared from the museum.',
      difficulty: 'medium',
      timeLimit: 30,
      location: 'City Museum',
      briefing: 'Last night, the priceless artifact disappeared without a trace...',
      evidence: [],
      suspects: [],
      solution: {
        perpetrator: 'suspect1',
        motive: 'Financial gain',
        explanation: 'The suspect needed money to pay off debts...'
      },
      status: 'active',
      startTime: Date.now()
    };
    return { currentCase: newCase, isPlaying: true };
  }),
  
  endCase: (solved: boolean) => set((state) => ({
    currentCase: state.currentCase ? {
      ...state.currentCase,
      status: solved ? 'solved' : 'failed',
      endTime: Date.now()
    } : null,
    isPlaying: false
  })),
  
  collectEvidence: (evidenceId: string) => set((state) => {
    if (!state.currentCase) return state;
    
    const updatedEvidence = state.currentCase.evidence.map(evidence =>
      evidence.id === evidenceId
        ? { ...evidence, isCollected: true, collectedBy: state.playerId }
        : evidence
    );
    
    return {
      currentCase: {
        ...state.currentCase,
        evidence: updatedEvidence
      }
    };
  }),
  
  addNote: (text: string, relatedEvidence?: string[], relatedSuspects?: string[]) => set((state) => {
    const players = new Map(state.players);
    const currentPlayer = players.get(state.playerId);
    
    if (currentPlayer) {
      const updatedPlayer = {
        ...currentPlayer,
        notes: [...(currentPlayer.notes || []), {
          id: uuidv4(),
          text,
          timestamp: Date.now(),
          relatedEvidence,
          relatedSuspects
        }]
      };
      players.set(state.playerId, updatedPlayer);
    }
    
    return { players };
  }),
  
  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setPlayerName: (name) => set({ playerName: name }),
  
  addPlayer: (player) => set((state) => {
    const newPlayers = new Map(state.players);
    newPlayers.set(player.id, player);
    return { players: newPlayers };
  }),
  
  removePlayer: (playerId) => set((state) => {
    const newPlayers = new Map(state.players);
    newPlayers.delete(playerId);
    return { players: newPlayers };
  }),
  
  updatePlayerPosition: (playerId, position) => set((state) => {
    const newPlayers = new Map(state.players);
    const player = newPlayers.get(playerId);
    if (player) {
      newPlayers.set(playerId, { ...player, position });
    }
    return { players: newPlayers };
  }),
  
  addMessage: (playerId, text) => set((state) => ({
    messages: [...state.messages, {
      id: uuidv4(),
      playerId,
      text,
      timestamp: Date.now()
    }]
  }))
}));