import { Compass, Users, Clock, MessageSquare } from 'lucide-react';
import { Chat } from './Chat';
import { PlayerList } from './PlayerList';
import { useState } from 'react';

export function GameHUD() {
  const [showPlayers, setShowPlayers] = useState(false);

  return (
    <div className="fixed top-0 left-0 w-full p-4 pointer-events-none">
      <div className="container mx-auto">
        <div className="flex justify-between items-start">
          {/* Case Info */}
          <div className="bg-black/50 text-white p-4 rounded-lg pointer-events-auto">
            <h2 className="text-xl font-bold mb-2">Current Case</h2>
            <p>The Missing Artifact</p>
          </div>

          {/* Status Icons */}
          <div className="flex gap-4">
            <div className="bg-black/50 text-white p-3 rounded-full pointer-events-auto">
              <Clock className="w-6 h-6" />
            </div>
            <button 
              onClick={() => setShowPlayers(!showPlayers)}
              className="bg-black/50 text-white p-3 rounded-full hover:bg-black/60 transition-colors pointer-events-auto"
            >
              <Users className="w-6 h-6" />
            </button>
            <div className="bg-black/50 text-white p-3 rounded-full pointer-events-auto">
              <Compass className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {showPlayers && <PlayerList />}
      <Chat />
    </div>
  );
}