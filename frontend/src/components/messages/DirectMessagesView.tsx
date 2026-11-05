import React, { useState } from 'react';
import {
  Send,
  Volume2,
  Mic,
  ArrowLeft,
  Search,
  CheckCheck,
  Shield,
  Sparkles,
  Phone,
  Video
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { Conversation } from '../../types/social';
import { soundEngine } from '../../utils/soundEngine';

export const DirectMessagesView: React.FC = () => {
  const { conversations, currentUser, sendMessage } = useSocial();
  const [activeConversationId, setActiveConversationId] = useState<string>(conversations[0]?.id || '');
  const [messageInput, setMessageInput] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || conversations[0];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    sendMessage(activeConversation.id, messageInput);
    setMessageInput('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.participant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.participant.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full max-w-4xl mx-auto h-[80vh] sm:h-[84vh] glass-panel rounded-3xl overflow-hidden border border-purple-500/25 shadow-2xl flex relative text-left">
      {/* Left Sidebar: Conversations List */}
      <div
        className={`w-full sm:w-80 border-r border-purple-500/15 flex flex-col bg-void-950/70 backdrop-blur-md ${
          activeConversationId ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {/* Header */}
        <div className="p-4 border-b border-purple-500/10 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-white tracking-tight flex items-center gap-2">
              <span>Chrono DMs</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-cyan-300">
                E2EE
              </span>
            </h2>
            <div className="flex items-center gap-1.5 text-xs text-purple-300">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span className="text-[11px]">Encrypted</span>
            </div>
          </div>

          <div className="relative">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-void-900 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-zinc-500 border border-purple-500/15 focus:outline-none focus:border-purple-400"
            />
          </div>
        </div>

        {/* Conversation Items */}
        <div className="flex-1 overflow-y-auto no-scrollbar divide-y divide-purple-500/10">
          {filteredConversations.map((conv) => {
            const isSelected = conv.id === activeConversationId;
            return (
              <div
                key={conv.id}
                onClick={() => {
                  soundEngine.playClick();
                  setActiveConversationId(conv.id);
                }}
                className={`p-3.5 flex items-center gap-3 cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-purple-950/40 border-l-2 border-purple-400'
                    : 'hover:bg-void-900/60'
                }`}
              >
                <div className="relative">
                  <img
                    src={conv.participant.avatarUrl}
                    alt={conv.participant.name}
                    className="w-11 h-11 rounded-2xl object-cover ring-1 ring-purple-500/30"
                  />
                  {conv.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-void-950" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs font-bold text-white truncate">
                      {conv.participant.name}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono">
                      {conv.lastTimestamp}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 truncate leading-relaxed">
                    {conv.lastMessage}
                  </p>
                </div>

                {conv.unreadCount > 0 && (
                  <span className="w-5 h-5 rounded-full bg-purple-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 shadow-glow-sm">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Right Panel: Chat Conversation */}
      <div
        className={`flex-1 flex flex-col bg-void-900/40 backdrop-blur-md ${
          !activeConversationId ? 'hidden sm:flex' : 'flex'
        }`}
      >
        {activeConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-3.5 sm:p-4 border-b border-purple-500/15 flex items-center justify-between bg-void-950/80">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveConversationId('')}
                  className="sm:hidden p-1 text-zinc-400 hover:text-white"
                  aria-label="Back"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>

                <div className="relative">
                  <img
                    src={activeConversation.participant.avatarUrl}
                    alt={activeConversation.participant.name}
                    className="w-10 h-10 rounded-2xl object-cover ring-1 ring-purple-400"
                  />
                  {activeConversation.isOnline && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-400 border-2 border-void-950" />
                  )}
                </div>

                <div>
                  <div className="text-xs sm:text-sm font-bold text-white">
                    {activeConversation.participant.name}
                  </div>
                  <div className="text-[11px] text-purple-300/70 font-mono">
                    @{activeConversation.participant.username} • {activeConversation.isOnline ? 'Resonating Online' : 'Offline'}
                  </div>
                </div>
              </div>

              {/* Chat action controls */}
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-xl bg-void-850 hover:bg-purple-950/40 text-purple-300 transition-colors">
                  <Phone className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-void-850 hover:bg-purple-950/40 text-purple-300 transition-colors">
                  <Video className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Messages Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[78%] sm:max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        isMe
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-none shadow-md shadow-purple-950/40'
                          : 'bg-void-800 text-zinc-100 rounded-tl-none border border-purple-500/20'
                      }`}
                    >
                      {msg.text && <p>{msg.text}</p>}

                      {/* Voice Memo Snippet */}
                      {msg.voiceMemo && (
                        <div className="flex items-center gap-3 pt-1">
                          <button
                            onClick={() => soundEngine.playEchoShift()}
                            className="p-2 rounded-full bg-void-900/90 text-cyan-300 hover:text-white"
                          >
                            <Volume2 className="w-4 h-4" />
                          </button>
                          <div className="flex items-end gap-1 h-5 flex-1">
                            {msg.voiceMemo.wave.map((h, i) => (
                              <div
                                key={i}
                                className="w-1 bg-cyan-300 rounded-full"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-mono text-cyan-200">
                            {msg.voiceMemo.duration}s
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 text-[10px] text-zinc-500">
                      <span>{msg.timestamp}</span>
                      {isMe && <CheckCheck className="w-3.5 h-3.5 text-cyan-400" />}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chat Input Bar */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 border-t border-purple-500/15 bg-void-950/90 flex items-center gap-2">
              <button
                type="button"
                onClick={() => soundEngine.playEchoShift()}
                className="p-2.5 rounded-xl bg-void-850 hover:bg-purple-950 text-purple-300 hover:text-cyan-300 transition-colors"
                title="Send Voice Memo"
              >
                <Mic className="w-4 h-4" />
              </button>

              <input
                type="text"
                placeholder="Compose encrypted whisper..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                className="flex-1 bg-void-900 border border-purple-500/20 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-400"
              />

              <button
                type="submit"
                disabled={!messageInput.trim()}
                className="p-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white disabled:opacity-40 transition-all shadow-glow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-zinc-400">
            <Sparkles className="w-12 h-12 text-purple-400 mb-3" />
            <h3 className="text-base font-bold text-white">Select a Resonance Conversation</h3>
            <p className="text-xs text-zinc-500 mt-1">Connect directly through encrypted channels.</p>
          </div>
        )}
      </div>
    </div>
  );
};
