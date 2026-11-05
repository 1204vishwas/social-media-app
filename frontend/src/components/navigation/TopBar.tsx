import React from 'react';
import { Bell, MessageSquare, Sparkles, Radio, Compass, Plus } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { soundEngine } from '../../utils/soundEngine';

export const TopBar: React.FC = () => {
  const {
    currentUser,
    unreadNotificationsCount,
    unreadMessagesCount,
    toggleNotifications,
    setActiveTab,
    openCreateModal,
    activeTab
  } = useSocial();

  return (
    <header className="sticky top-0 z-40 w-full px-4 sm:px-8 py-3.5 border-b border-purple-500/15 bg-[#05040a]/80 backdrop-blur-xl flex items-center justify-between">
      {/* Brand Mark */}
      <div
        onClick={() => setActiveTab('feed')}
        className="flex items-center gap-3 cursor-pointer group select-none"
      >
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-600 via-fuchsia-600 to-cyan-400 p-0.5 shadow-glow-sm group-hover:scale-105 transition-transform">
          <div className="w-full h-full bg-void-950 rounded-[14px] flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-purple-400 group-hover:text-cyan-300 transition-colors" />
          </div>
        </div>

        <div>
          <span className="text-xl font-extrabold tracking-wider text-white font-mono flex items-center">
            AURA<span className="text-purple-400">.</span>
          </span>
          <span className="text-[10px] uppercase tracking-widest text-cyan-300/80 font-bold block -mt-1">
            Dual Reality Network
          </span>
        </div>
      </div>

      {/* Global Action Icons */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Quick Create Button (Desktop) */}
        <button
          onClick={openCreateModal}
          className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:brightness-110 text-white text-xs font-semibold shadow-md shadow-purple-950/40 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Mint Echo</span>
        </button>

        {/* Notifications Button */}
        <button
          onClick={toggleNotifications}
          className="relative p-2.5 rounded-2xl bg-void-900/80 hover:bg-purple-950/40 border border-purple-500/20 text-purple-300 hover:text-white transition-all focus:outline-none"
          aria-label="Notifications"
        >
          <Bell className="w-4 h-4" />
          {unreadNotificationsCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-cyan-400 text-void-950 font-bold text-[9px] flex items-center justify-center shadow-glow-cyan animate-pulse">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        {/* Direct Messages Shortcut */}
        <button
          onClick={() => setActiveTab('messages')}
          className={`relative p-2.5 rounded-2xl bg-void-900/80 hover:bg-purple-950/40 border transition-all focus:outline-none ${
            activeTab === 'messages'
              ? 'border-cyan-400 text-cyan-300 shadow-glow-cyan'
              : 'border-purple-500/20 text-purple-300 hover:text-white'
          }`}
          aria-label="Direct Messages"
        >
          <MessageSquare className="w-4 h-4" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white font-bold text-[9px] flex items-center justify-center animate-bounce">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        {/* User Avatar Shortcut */}
        <div
          onClick={() => setActiveTab('profile')}
          className="relative cursor-pointer group ml-1"
        >
          <img
            src={currentUser.avatarUrl}
            alt={currentUser.name}
            className={`w-9 h-9 rounded-2xl object-cover ring-2 transition-transform group-hover:scale-105 ${
              activeTab === 'profile' ? 'ring-cyan-400 shadow-glow-cyan' : 'ring-purple-500/50'
            }`}
          />
        </div>
      </div>
    </header>
  );
};
