import React, { useState } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Music,
  ChevronUp,
  ChevronDown,
  Layers,
  Sparkles,
  CheckCircle2,
  Radio
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { soundEngine } from '../../utils/soundEngine';

export const ReelsStream: React.FC = () => {
  const { reels, toggleLikeReel, toggleSaveReel } = useSocial();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [showHeartAnim, setShowHeartAnim] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);

  const currentReel = reels[currentIndex] || reels[0];

  const handleNext = () => {
    if (currentIndex < reels.length - 1) {
      soundEngine.playClick();
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      soundEngine.playClick();
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleDoubleTap = () => {
    if (!currentReel.isLiked) {
      toggleLikeReel(currentReel.id);
    }
    soundEngine.playChime(659.25);
    setShowHeartAnim(true);
    setTimeout(() => setShowHeartAnim(false), 700);
  };

  if (!currentReel) return null;

  return (
    <div className="relative w-full max-w-md mx-auto h-[82vh] sm:h-[86vh] rounded-3xl overflow-hidden glass-panel border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.25)] select-none">
      {/* Background Reel Media */}
      <div className="relative w-full h-full cursor-pointer" onDoubleClick={handleDoubleTap}>
        <img
          src={currentReel.posterUrl}
          alt={currentReel.caption}
          className="w-full h-full object-cover filter contrast-105"
        />

        {/* Ambient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/90 pointer-events-none" />

        {/* Double-tap Floating Heart Animation */}
        {showHeartAnim && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-30">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_30px_rgba(244,63,94,0.9)] animate-heart-pop" />
          </div>
        )}
      </div>

      {/* Top Header Controls */}
      <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between">
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-void-950/80 border border-purple-500/30 backdrop-blur-md">
          <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
          <span className="text-xs font-bold text-white tracking-wider uppercase">
            Aura Pulse • Reel {currentIndex + 1}/{reels.length}
          </span>
        </div>

        <button
          onClick={() => {
            setIsMuted(!isMuted);
            soundEngine.playClick();
          }}
          className="p-2 rounded-full bg-void-950/80 border border-purple-500/30 text-white backdrop-blur-md hover:border-cyan-400 transition-all"
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-300" />}
        </button>
      </div>

      {/* Vertical Navigation Arrows (Floating) */}
      <div className="absolute top-1/2 -translate-y-1/2 left-3 z-20 flex flex-col gap-2">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className="p-2 rounded-full bg-void-950/70 border border-purple-500/20 text-white hover:bg-purple-900/40 disabled:opacity-20 transition-all"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
        <button
          onClick={handleNext}
          disabled={currentIndex === reels.length - 1}
          className="p-2 rounded-full bg-void-950/70 border border-purple-500/20 text-white hover:bg-purple-900/40 disabled:opacity-20 transition-all"
        >
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Right Sidebar Interaction Actions */}
      <div className="absolute right-3.5 bottom-16 z-20 flex flex-col items-center gap-5">
        {/* Author Avatar with Follow Plus */}
        <div className="relative cursor-pointer group">
          <img
            src={currentReel.author.avatarUrl}
            alt={currentReel.author.name}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500 shadow-md group-hover:scale-105 transition-transform"
          />
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-purple-600 border border-void-950 flex items-center justify-center text-[10px] text-white font-bold">
            +
          </div>
        </div>

        {/* Like */}
        <button
          onClick={() => toggleLikeReel(currentReel.id)}
          className="flex flex-col items-center gap-1 group focus:outline-none"
        >
          <div className="p-2.5 rounded-full bg-void-950/80 border border-purple-500/25 group-hover:border-rose-500/50 backdrop-blur-md transition-all">
            <Heart
              className={`w-6 h-6 transition-transform group-hover:scale-115 ${
                currentReel.isLiked
                  ? 'text-rose-500 fill-rose-500 filter drop-shadow-[0_0_12px_rgba(244,63,94,0.7)]'
                  : 'text-white'
              }`}
            />
          </div>
          <span className="text-[11px] font-bold text-white font-mono">
            {currentReel.metrics.likes.toLocaleString()}
          </span>
        </button>

        {/* Echo Shift (Unique metric) */}
        <div className="flex flex-col items-center gap-1">
          <div className="p-2.5 rounded-full bg-void-950/80 border border-cyan-500/30 backdrop-blur-md">
            <Layers className="w-6 h-6 text-cyan-300" />
          </div>
          <span className="text-[11px] font-bold text-cyan-300 font-mono">
            {currentReel.metrics.echoShifts.toLocaleString()}
          </span>
        </div>

        {/* Comments */}
        <button
          onClick={() => setIsCommentsOpen(!isCommentsOpen)}
          className="flex flex-col items-center gap-1 group focus:outline-none"
        >
          <div className="p-2.5 rounded-full bg-void-950/80 border border-purple-500/25 group-hover:border-purple-400 backdrop-blur-md transition-all">
            <MessageCircle className="w-6 h-6 text-white group-hover:scale-110" />
          </div>
          <span className="text-[11px] font-bold text-white font-mono">
            {currentReel.metrics.comments.toLocaleString()}
          </span>
        </button>

        {/* Bookmark */}
        <button
          onClick={() => toggleSaveReel(currentReel.id)}
          className="flex flex-col items-center gap-1 focus:outline-none"
        >
          <div className="p-2.5 rounded-full bg-void-950/80 border border-purple-500/25 backdrop-blur-md transition-all">
            <Bookmark
              className={`w-6 h-6 ${
                currentReel.isSaved
                  ? 'text-purple-400 fill-purple-400 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.7)]'
                  : 'text-white'
              }`}
            />
          </div>
        </button>

        {/* Spinning Holographic Vinyl Music Disc */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-800 via-void-900 to-cyan-500 p-1 animate-spin ring-1 ring-purple-400/40 shadow-glow-sm">
          <div className="w-full h-full rounded-full bg-void-950 flex items-center justify-center">
            <Music className="w-3.5 h-3.5 text-cyan-300" />
          </div>
        </div>
      </div>

      {/* Bottom Creator Information Overlay */}
      <div className="absolute left-4 right-16 bottom-4 z-20 text-left space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white flex items-center gap-1">
            <span>@{currentReel.author.username}</span>
            {currentReel.author.isVerified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            )}
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-900/60 border border-purple-500/30 text-purple-200">
            {currentReel.vibe}
          </span>
        </div>

        <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed">
          {currentReel.caption}
        </p>

        {/* Audio Track Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-purple-500/20 backdrop-blur-md text-[11px] text-cyan-300 font-mono">
          <Music className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="truncate max-w-[200px]">
            {currentReel.audioTrack.title} • {currentReel.audioTrack.artist}
          </span>
        </div>
      </div>
    </div>
  );
};
