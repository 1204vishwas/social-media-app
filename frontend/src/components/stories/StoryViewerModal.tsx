import React, { useState, useEffect } from 'react';
import { X, Heart, Send, Music, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { soundEngine } from '../../utils/soundEngine';

export const StoryViewerModal: React.FC = () => {
  const { activeStory, closeStory, stories, openStory } = useSocial();
  const [progress, setProgress] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [replyText, setReplyText] = useState<string>('');
  const [hasLikedStory, setHasLikedStory] = useState<boolean>(false);

  useEffect(() => {
    if (!activeStory || isPaused) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          // Advance to next story if available
          const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
          if (currentIndex < stories.length - 1) {
            openStory(stories[currentIndex + 1]);
            return 0;
          } else {
            closeStory();
            return 0;
          }
        }
        return prev + 2;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeStory, isPaused, stories]);

  if (!activeStory) return null;

  const handleNext = () => {
    const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
    if (currentIndex < stories.length - 1) {
      setProgress(0);
      openStory(stories[currentIndex + 1]);
    } else {
      closeStory();
    }
  };

  const handlePrev = () => {
    const currentIndex = stories.findIndex((s) => s.id === activeStory.id);
    if (currentIndex > 0) {
      setProgress(0);
      openStory(stories[currentIndex - 1]);
    }
  };

  const handleSendReaction = (emoji: string) => {
    soundEngine.playChime(700);
    setReplyText(`Sent ${emoji}`);
    setTimeout(() => setReplyText(''), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-2xl animate-fadeIn p-2 sm:p-4">
      {/* Navigation buttons */}
      <button
        onClick={handlePrev}
        className="hidden md:flex absolute left-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-void-900/80 border border-purple-500/30 items-center justify-center text-white hover:bg-purple-900/40 transition-all z-20"
        aria-label="Previous story"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={handleNext}
        className="hidden md:flex absolute right-8 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-void-900/80 border border-purple-500/30 items-center justify-center text-white hover:bg-purple-900/40 transition-all z-20"
        aria-label="Next story"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Story Phone Container */}
      <div
        className="relative w-full max-w-sm sm:max-w-md h-[85vh] sm:h-[88vh] rounded-3xl overflow-hidden glass-panel border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] flex flex-col justify-between"
        onMouseDown={() => setIsPaused(true)}
        onMouseUp={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Background Image */}
        <img
          src={activeStory.mediaUrl}
          alt="Story Media"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Ambient Dark Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/90 pointer-events-none" />

        {/* Story Header */}
        <div className="relative z-10 p-4 space-y-3">
          {/* Progress Bar */}
          <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-purple-400 to-cyan-300 h-full transition-all duration-100 shadow-glow-sm"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src={activeStory.author.avatarUrl}
                alt={activeStory.author.name}
                className="w-9 h-9 rounded-full object-cover ring-2 ring-purple-500 shadow-md"
              />
              <div className="text-left">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <span>@{activeStory.author.username}</span>
                  <span className="text-[10px] text-zinc-400">{activeStory.createdAt}</span>
                </div>
                {activeStory.musicTitle && (
                  <div className="flex items-center gap-1 text-[10px] text-cyan-300 truncate max-w-[180px]">
                    <Music className="w-3 h-3 shrink-0 animate-spin" />
                    <span>{activeStory.musicTitle}</span>
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={closeStory}
              className="p-1.5 rounded-full bg-black/40 hover:bg-black/80 text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Story Caption & Interactivity */}
        <div className="relative z-10 p-4 space-y-3">
          {activeStory.caption && (
            <div className="p-3 rounded-2xl bg-black/60 backdrop-blur-md border border-purple-500/20 text-left text-xs text-white">
              {activeStory.caption}
            </div>
          )}

          {/* Quick Reaction Emojis */}
          <div className="flex items-center justify-around py-1">
            {['🔥', '💜', '⚡', '🌌', '✨'].map((emoji) => (
              <button
                key={emoji}
                onClick={() => handleSendReaction(emoji)}
                className="text-lg hover:scale-130 transition-transform active:scale-95"
              >
                {emoji}
              </button>
            ))}
          </div>

          {/* Reply Bar */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder={`Send Echo to @${activeStory.author.username}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              className="flex-1 bg-void-950/80 border border-purple-500/30 rounded-full px-4 py-2.5 text-xs text-white placeholder:text-zinc-400 focus:outline-none focus:border-cyan-400"
            />
            <button
              onClick={() => {
                setHasLikedStory(!hasLikedStory);
                soundEngine.playChime(659);
              }}
              className="p-2 rounded-full bg-void-900 border border-purple-500/30 hover:border-purple-400 text-white"
            >
              <Heart
                className={`w-4 h-4 ${hasLikedStory ? 'text-rose-500 fill-rose-500' : ''}`}
              />
            </button>
            <button
              onClick={() => {
                if (replyText) {
                  soundEngine.playChime(784);
                  setReplyText('Echo Sent! 🚀');
                  setTimeout(() => setReplyText(''), 1500);
                }
              }}
              className="p-2 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 text-white shadow-glow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
