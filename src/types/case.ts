export interface Evidence {
  id: string;
  name: string;
  description: string;
  type: 'physical' | 'document' | 'testimony' | 'digital';
  location: { x: number; y: number; z: number };
  isCollected: boolean;
  collectedBy?: string; // Player ID
  relatedSuspects: string[];
}

export interface Suspect {
  id: string;
  name: string;
  description: string;
  alibi: string;
  isGuilty: boolean;
  clues: string[];
  relationships: Array<{
    suspectId: string;
    relationship: string;
  }>;
}

export interface Case {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  timeLimit: number; // in minutes
  location: string;
  briefing: string;
  evidence: Evidence[];
  suspects: Suspect[];
  solution: {
    perpetrator: string;
    motive: string;
    explanation: string;
  };
  status: 'pending' | 'active' | 'solved' | 'failed';
  startTime?: number;
  endTime?: number;
}