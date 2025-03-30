import Peer, { DataConnection } from 'peerjs';
import { useGameStore, Player } from '../store/gameStore';

export class NetworkManager {
  public peer: Peer;
  private connections: Map<string, DataConnection> = new Map();
  private store = useGameStore.getState();

  constructor() {
    // Generate a random 6-character code
    const gameCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    this.peer = new Peer(gameCode);
    this.setupPeerEvents();
  }

  private setupPeerEvents() {
    this.peer.on('open', (id) => {
      console.log('Connected with ID:', id);
    });

    this.peer.on('connection', (conn) => {
      this.handleConnection(conn);
    });

    this.peer.on('error', (error) => {
      console.error('PeerJS error:', error);
    });
  }

  private handleConnection(conn: DataConnection) {
    this.connections.set(conn.peer, conn);

    conn.on('data', (data: any) => {
      this.handleMessage(data);
    });

    conn.on('close', () => {
      this.connections.delete(conn.peer);
      useGameStore.getState().removePlayer(conn.peer);
    });
  }

  private handleMessage(data: any) {
    switch (data.type) {
      case 'PLAYER_JOIN':
        useGameStore.getState().addPlayer(data.player);
        break;
      case 'PLAYER_LEAVE':
        useGameStore.getState().removePlayer(data.playerId);
        break;
      case 'PLAYER_POSITION':
        useGameStore.getState().updatePlayerPosition(data.playerId, data.position);
        break;
      case 'CHAT_MESSAGE':
        useGameStore.getState().addMessage(data.playerId, data.text);
        break;
      case 'EVIDENCE_COLLECTED':
        useGameStore.getState().collectEvidence(data.evidenceId);
        break;
      case 'CASE_START':
        useGameStore.getState().startCase(data.caseId);
        break;
      case 'CASE_END':
        useGameStore.getState().endCase(data.solved);
        break;
    }
  }

  public connect(hostId: string) {
    // Convert the input code to uppercase for case-insensitive comparison
    const normalizedCode = hostId.toUpperCase();
    const conn = this.peer.connect(normalizedCode);
    this.handleConnection(conn);
  }

  public broadcast(data: any) {
    this.connections.forEach((conn) => {
      conn.send(data);
    });
  }

  public sendPlayerPosition(position: { x: number; y: number; z: number }) {
    this.broadcast({
      type: 'PLAYER_POSITION',
      playerId: this.store.playerId,
      position
    });
  }

  public sendChatMessage(text: string) {
    this.broadcast({
      type: 'CHAT_MESSAGE',
      playerId: this.store.playerId,
      text
    });
  }

  public sendEvidenceCollected(evidenceId: string) {
    this.broadcast({
      type: 'EVIDENCE_COLLECTED',
      evidenceId
    });
  }

  public startCase(caseId: string) {
    this.broadcast({
      type: 'CASE_START',
      caseId
    });
  }

  public endCase(solved: boolean) {
    this.broadcast({
      type: 'CASE_END',
      solved
    });
  }

  public disconnect() {
    this.connections.forEach((conn) => conn.close());
    this.peer.destroy();
  }
}

export const networkManager = new NetworkManager();