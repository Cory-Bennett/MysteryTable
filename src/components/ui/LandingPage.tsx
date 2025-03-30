import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';
import { networkManager } from '../../services/NetworkManager';
import { Search, Users, Brain, Play, Copy } from 'lucide-react';

export function LandingPage() {
  const [gameCode, setGameCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [error, setError] = useState('');
  const [createdGameCode, setCreatedGameCode] = useState('');
  const [showCodeCopied, setShowCodeCopied] = useState(false);
  const setIsPlaying = useGameStore((state) => state.setIsPlaying);
  const setPlayerName_ = useGameStore((state) => state.setPlayerName);

  const handleCreateGame = () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    setPlayerName_(playerName);
    const newGameCode = networkManager.peer.id;
    setCreatedGameCode(newGameCode);
    console.log('Game created with code:', newGameCode);
  };

  const handleJoinGame = () => {
    if (!playerName.trim()) {
      setError('Please enter your name');
      return;
    }
    if (!gameCode.trim()) {
      setError('Please enter a game code');
      return;
    }
    setPlayerName_(playerName);
    networkManager.connect(gameCode);
    setIsPlaying(true);
  };

  const handleStartGame = () => {
    setIsPlaying(true);
  };

  const copyGameCode = async () => {
    await navigator.clipboard.writeText(createdGameCode);
    setShowCodeCopied(true);
    setTimeout(() => setShowCodeCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4">Mystery Table</h1>
          <p className="text-xl text-gray-300">Collaborative Detective Experience</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Game Features */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 space-y-6">
            <h2 className="text-2xl font-bold text-white mb-6">Game Features</h2>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4 text-gray-300">
                <Users className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Multiplayer Investigation</h3>
                  <p className="text-sm">Work together to solve mysteries</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-300">
                <Search className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Collect Evidence</h3>
                  <p className="text-sm">Find and analyze clues</p>
                </div>
              </div>

              <div className="flex items-center space-x-4 text-gray-300">
                <Brain className="w-6 h-6" />
                <div>
                  <h3 className="font-semibold">Solve Cases</h3>
                  <p className="text-sm">Put the pieces together</p>
                </div>
              </div>
            </div>
          </div>

          {/* Join/Create Game */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Start Playing</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-300 text-sm font-medium mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter your detective name"
                />
              </div>

              {!createdGameCode && (
                <div>
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Game Code
                  </label>
                  <input
                    type="text"
                    value={gameCode}
                    onChange={(e) => setGameCode(e.target.value)}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Enter game code to join"
                  />
                </div>
              )}

              {createdGameCode && (
                <div className="bg-white/5 p-4 rounded-lg border border-white/10">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Share this code with other players
                  </label>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 px-3 py-2 bg-white/5 rounded text-purple-300 font-mono">
                      {createdGameCode}
                    </code>
                    <button
                      onClick={copyGameCode}
                      className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                      title="Copy game code"
                    >
                      <Copy className="w-5 h-5 text-gray-300" />
                    </button>
                  </div>
                  {showCodeCopied && (
                    <p className="text-green-400 text-sm mt-2">Code copied!</p>
                  )}
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm">{error}</p>
              )}

              <div className="grid grid-cols-2 gap-4 mt-6">
                {!createdGameCode ? (
                  <>
                    <button
                      onClick={handleCreateGame}
                      className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      <Play className="w-5 h-5" />
                      Create Game
                    </button>
                    <button
                      onClick={handleJoinGame}
                      className="px-6 py-3 bg-white/5 text-white rounded-lg hover:bg-white/10 transition-colors border border-white/10"
                    >
                      Join Game
                    </button>
                  </>
                ) : (
                  <button
                    onClick={handleStartGame}
                    className="col-span-2 flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    <Play className="w-5 h-5" />
                    Start Game
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}