import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { networkManager } from '../../services/NetworkManager';

export function Chat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const messages = useGameStore((state) => state.messages);
  const players = useGameStore((state) => state.players);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      networkManager.sendChatMessage(message.trim());
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 pointer-events-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 text-white p-3 rounded-full hover:bg-black/60 transition-colors"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {isOpen && (
        <div className="absolute bottom-16 right-0 w-80 bg-black/50 rounded-lg overflow-hidden">
          <div className="h-96 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 space-y-2">
              {messages.map((msg) => {
                const player = players.get(msg.playerId);
                return (
                  <div key={msg.id} className="text-white">
                    <span className="font-bold">{player?.name || 'Unknown'}: </span>
                    <span>{msg.text}</span>
                  </div>
                );
              })}
            </div>
            <form onSubmit={handleSend} className="p-4 bg-black/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex-1 bg-white/10 text-white rounded px-3 py-2"
                  placeholder="Type a message..."
                />
                <button
                  type="submit"
                  className="bg-white/10 text-white p-2 rounded hover:bg-white/20 transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}