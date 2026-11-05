import React from 'react';
import { Plus } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';

export const StoriesBar: React.FC = () => {
  const { stories, currentUser, openStory, openCreateModal } = useSocial();

  return (
    <div className="w-full glass-panel-subtle rounded-3xl p-3 sm:p-4 border border-purple-500/20 shadow-lg backdrop-blur-xl mb-6">
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto no-scrollbar py-1">
        {/* Add Story Button (CurrentUser) */}
        <div
          onClick={openCreateModal}
          className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
        >
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 border-2 border-dashed border-purple-500/50 group-hover:border-purple-400 transition-colors flex items-center justify-center bg-void-900">
              <img
                src={currentUser.avatarUrl}
                alt="Your Story"
                className="w-full h-full rounded-[14px] object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-white border-2 border-void-950 shadow-glow-sm">
              <Plus className="w-3.5 h-3.5" strokeWidth={3} />
            </div>
          </div>
          <span className="text-[11px] font-semibold text-zinc-300 group-hover:text-purple-300 truncate max-w-[64px]">
            Your Echo
          </span>
        </div>

        {/* Stories list */}
        {stories.map((story) => {
          return (
            <div
              key={story.id}
              onClick={() => openStory(story)}
              className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl p-0.5 transition-transform duration-300 group-hover:scale-105 ${
                  story.hasUnseen
                    ? 'bg-gradient-to-tr from-purple-500 via-fuchsia-500 to-cyan-400 shadow-[0_0_15px_rgba(168,85,247,0.4)] animate-pulse'
                    : 'border-2 border-purple-500/30'
                }`}
              >
                <img
                  src={story.author.avatarUrl}
                  alt={story.author.name}
                  className="w-full h-full rounded-[14px] object-cover ring-2 ring-void-950"
                />
              </div>
              <span className="text-[11px] font-semibold text-zinc-300 group-hover:text-white truncate max-w-[64px]">
                {story.author.username.split('.')[0]}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
