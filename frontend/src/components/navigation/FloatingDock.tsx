import React from 'react';
import { Layers, Play, Compass, MessageSquare, User, Plus } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { MainNavTab } from '../../types/social';

export const FloatingDock: React.FC = () => {
  const { activeTab, setActiveTab, openCreateModal, unreadMessagesCount } = useSocial();

  const navItems: { tab: MainNavTab; label: string; icon: React.ReactNode }[] = [
    {
      tab: 'feed',
      label: 'Timeline',
      icon: <Layers className="w-5 h-5" />,
    },
    {
      tab: 'reels',
      label: 'Pulse',
      icon: <Play className="w-5 h-5" />,
    },
    {
      tab: 'explore',
      label: 'Explore',
      icon: <Compass className="w-5 h-5" />,
    },
    {
      tab: 'messages',
      label: 'Whispers',
      icon: (
        <div className="relative">
          <MessageSquare className="w-5 h-5" />
          {unreadMessagesCount > 0 && (
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          )}
        </div>
      ),
    },
    {
      tab: 'profile',
      label: 'Realm',
      icon: <User className="w-5 h-5" />,
    },
  ];

  return (
    <nav className="fixed bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-40 max-w-fit px-3 sm:px-4 py-2 sm:py-2.5 rounded-full glass-panel border border-purple-500/30 shadow-[0_10px_40px_rgba(0,0,0,0.8),0_0_20px_rgba(168,85,247,0.3)] backdrop-blur-2xl flex items-center gap-1.5 sm:gap-3 select-none">
      {/* First 2 items (Feed, Reels) */}
      {navItems.slice(0, 2).map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-sm scale-105'
                : 'text-zinc-400 hover:text-purple-200 hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        );
      })}

      {/* Center Floating Create Button */}
      <button
        onClick={openCreateModal}
        className="relative -top-2 mx-1 w-12 h-12 rounded-full bg-gradient-to-tr from-purple-600 via-fuchsia-500 to-cyan-400 p-0.5 shadow-[0_0_25px_rgba(168,85,247,0.6)] hover:scale-110 active:scale-95 transition-all"
        title="Mint Dual Prism Creation"
      >
        <div className="w-full h-full rounded-full bg-void-950 flex items-center justify-center text-white">
          <Plus className="w-6 h-6 text-cyan-300" strokeWidth={2.5} />
        </div>
      </button>

      {/* Last 3 items (Explore, Messages, Profile) */}
      {navItems.slice(2).map((item) => {
        const isActive = activeTab === item.tab;
        return (
          <button
            key={item.tab}
            onClick={() => setActiveTab(item.tab)}
            className={`relative flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
              isActive
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-sm scale-105'
                : 'text-zinc-400 hover:text-purple-200 hover:bg-white/5'
            }`}
          >
            {item.icon}
            <span className="hidden md:inline">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
