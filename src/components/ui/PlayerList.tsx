import { useGameStore } from '../../store/gameStore';

export function PlayerList() {
  const players = useGameStore((state) => state.players);

  return (
    <div className="fixed top-20 right-4 bg-black/50 text-white p-4 rounded-lg pointer-events-auto">
      <h3 className="text-lg font-bold mb-3">Players</h3>
      <div className="space-y-2">
        {Array.from(players.values()).map((player) => (
          <div key={player.id} className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500" />
            <span>{player.name}</span>
            {player.isHost && <span className="text-xs text-gray-300">(Host)</span>}
          </div>
        ))}
      </div>
    </div>
  );
}