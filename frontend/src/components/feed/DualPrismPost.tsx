import React, { useState, useRef } from 'react';
import {
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Volume2,
  VolumeX,
  Sparkles,
  Sliders,
  Send,
  MoreHorizontal,
  CheckCircle2,
  Radio,
  Layers,
  Flame
} from 'lucide-react';
import { Post } from '../../types/social';
import { useSocial } from '../../context/SocialContext';
import { soundEngine } from '../../utils/soundEngine';

interface DualPrismPostProps {
  post: Post;
}

export const DualPrismPost: React.FC<DualPrismPostProps> = ({ post }) => {
  const { toggleLikePost, toggleSavePost, recordEchoShift, addComment } = useSocial();
  
  // Dual Prism Splitter state (0 to 100 percentage of reveal)
  const [splitPercent, setSplitPercent] = useState<number>(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [showHeartAnimation, setShowHeartAnimation] = useState<boolean>(false);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(false);
  const [commentInput, setCommentInput] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const audioIntervalRef = useRef<any>(null);
  const [audioProgress, setAudioProgress] = useState<number>(0);

  // Handle double-tap to like on image
  const handleDoubleTap = () => {
    if (!post.isLiked) {
      toggleLikePost(post.id);
    }
    setShowHeartAnimation(true);
    soundEngine.playChime(659.25);
    setTimeout(() => setShowHeartAnimation(false), 800);
  };

  // Toggle Audio Echo playback
  const toggleAudioEcho = () => {
    if (isPlayingAudio) {
      setIsPlayingAudio(false);
      clearInterval(audioIntervalRef.current);
    } else {
      setIsPlayingAudio(true);
      soundEngine.playEchoShift();
      
      const duration = post.content.acousticEcho?.duration || 15;
      let currentSec = 0;
      audioIntervalRef.current = setInterval(() => {
        currentSec += 0.5;
        setAudioProgress((currentSec / duration) * 100);
        if (currentSec >= duration) {
          setIsPlayingAudio(false);
          setAudioProgress(0);
          clearInterval(audioIntervalRef.current);
        }
      }, 500);
    }
  };

  // Quick toggle between 0% (Canvas) and 100% (Echo)
  const toggleRealityShift = () => {
    recordEchoShift(post.id);
    setSplitPercent((prev) => (prev > 50 ? 0 : 100));
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentInput.trim()) return;
    addComment(post.id, commentInput);
    setCommentInput('');
  };

  const handleShare = () => {
    soundEngine.playClick();
    setCopiedLink(true);
    navigator.clipboard?.writeText?.(window.location.href);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const isEchoActive = splitPercent > 50;

  return (
    <article className="w-full glass-panel rounded-3xl overflow-hidden border border-purple-500/25 shadow-2xl relative transition-all duration-300 hover:border-purple-500/40">
      {/* Post Top Header */}
      <header className="p-4 sm:p-5 flex items-center justify-between border-b border-purple-500/10">
        <div className="flex items-center gap-3">
          <div className="relative cursor-pointer group">
            <div className="w-11 h-11 rounded-2xl p-0.5 bg-gradient-to-tr from-purple-500 via-indigo-500 to-cyan-400 group-hover:scale-105 transition-transform shadow-glow-sm">
              <img
                src={post.author.avatarUrl}
                alt={post.author.name}
                className="w-full h-full rounded-[14px] object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-400 border-2 border-void-950" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-bold text-white hover:text-purple-300 transition-colors cursor-pointer">
                {post.author.name}
              </span>
              {post.author.isVerified && (
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
              )}
            </div>
            <div className="flex items-center gap-2 text-[11px] text-purple-300/70">
              <span>@{post.author.username}</span>
              {post.content.location && (
                <>
                  <span>•</span>
                  <span className="text-zinc-400 truncate max-w-[140px] sm:max-w-none">
                    {post.content.location}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Post Actions & Vibe Badge */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-purple-950/60 border border-purple-500/30 text-purple-300">
            <Radio className="w-3 h-3 text-purple-400 animate-pulse" />
            {post.content.vibeFrequency}
          </span>
          <button
            className="text-zinc-400 hover:text-white p-1.5 rounded-lg hover:bg-white/5 transition-colors"
            aria-label="Options"
          >
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* DUAL PRISM SPLITTER: The Revolutionary Interactive Layer */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] bg-void-950 select-none overflow-hidden group">
        {/* Layer 1: Curated Canvas Image */}
        <img
          src={post.content.canvasImage}
          alt="Curated Canvas"
          className="absolute inset-0 w-full h-full object-cover transition-filter duration-300"
          onDoubleClick={handleDoubleTap}
        />

        {/* Layer 2: Raw Echo Image (Clipped dynamically by splitPercent) */}
        <div
          className="absolute inset-0 overflow-hidden pointer-events-none transition-all"
          style={{ clipPath: `inset(0 0 0 ${100 - splitPercent}%)` }}
        >
          <img
            src={post.content.echoImage}
            alt="Raw Behind-The-Scenes Echo"
            className="absolute inset-0 w-full h-full object-cover filter contrast-110 saturate-125"
          />
          {/* Subtle Cyber scanline / grain overlay on raw layer */}
          <div className="absolute inset-0 bg-[radial-gradient(#a855f7_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
          
          {/* Echo Reality Watermark Badge */}
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-xl bg-purple-950/90 border border-purple-400/50 backdrop-blur-md shadow-lg flex items-center gap-1.5 text-xs font-bold text-cyan-300">
            <Layers className="w-3.5 h-3.5 text-cyan-400" />
            <span>RAW ECHO LAYER</span>
          </div>

          {/* Raw Thought-log banner at bottom */}
          {post.content.rawThoughtLog && (
            <div className="absolute bottom-12 left-4 right-4 p-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-purple-500/30 text-[11px] font-mono text-purple-200">
              ⚡ {post.content.rawThoughtLog}
            </div>
          )}
        </div>

        {/* Vertical Holographic Splitter Line */}
        {splitPercent > 0 && splitPercent < 100 && (
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-white to-purple-500 shadow-[0_0_15px_#38bdf8] pointer-events-none z-10"
            style={{ left: `${splitPercent}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-7 h-7 rounded-full bg-void-900 border-2 border-cyan-400 flex items-center justify-center shadow-glow-cyan text-white text-[10px]">
              <Sliders className="w-3 h-3 text-cyan-300 rotate-90" />
            </div>
          </div>
        )}

        {/* Double-tap Floating Heart Explosion */}
        {showHeartAnimation && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20">
            <Heart className="w-24 h-24 text-rose-500 fill-rose-500 filter drop-shadow-[0_0_25px_rgba(244,63,94,0.8)] animate-heart-pop" />
          </div>
        )}

        {/* Interactive Reality Slider Bar (Overlaid at bottom of image) */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between gap-3 p-2 rounded-2xl bg-void-950/80 backdrop-blur-md border border-purple-500/25 shadow-lg">
          <div className="flex items-center gap-2 text-xs font-semibold">
            <span
              className={`transition-colors cursor-pointer text-[11px] ${
                splitPercent < 50 ? 'text-white font-bold' : 'text-zinc-400'
              }`}
              onClick={() => {
                setSplitPercent(0);
                soundEngine.playClick();
              }}
            >
              Canvas
            </span>
          </div>

          <div className="flex-1 relative flex items-center">
            <input
              type="range"
              min="0"
              max="100"
              value={splitPercent}
              onChange={(e) => {
                const val = Number(e.target.value);
                setSplitPercent(val);
                if (val % 25 === 0) soundEngine.playClick();
              }}
              onMouseUp={() => recordEchoShift(post.id)}
              onTouchEnd={() => recordEchoShift(post.id)}
              className="w-full prism-slider cursor-ew-resize"
              aria-label="Split Reality Slider"
            />
          </div>

          <div className="flex items-center gap-2">
            <span
              className={`transition-colors cursor-pointer text-[11px] ${
                splitPercent >= 50 ? 'text-cyan-300 font-bold' : 'text-zinc-400'
              }`}
              onClick={() => {
                setSplitPercent(100);
                recordEchoShift(post.id);
              }}
            >
              Raw Echo
            </span>

            <button
              onClick={toggleRealityShift}
              className="p-1.5 rounded-lg bg-purple-600/30 hover:bg-purple-600/50 border border-purple-400/40 text-purple-200 transition-all text-xs"
              title="Quick Toggle Dual Reality"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Acoustic Waveform Player (Simulated Voice Memo / Soundtrack) */}
      {post.content.acousticEcho && (
        <div className="mx-4 mt-4 p-3 rounded-2xl bg-void-900/90 border border-purple-500/20 backdrop-blur-md flex items-center justify-between gap-3">
          <button
            onClick={toggleAudioEcho}
            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all shadow-md ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-purple-500 to-cyan-400 text-white shadow-purple-900/50'
                : 'bg-void-800 text-purple-300 hover:bg-void-700'
            }`}
          >
            {isPlayingAudio ? (
              <Volume2 className="w-4 h-4 animate-bounce" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="font-semibold text-white truncate max-w-[200px]">
                {post.content.acousticEcho.title}
              </span>
              <span className="text-[10px] text-purple-300 font-mono">
                {isPlayingAudio ? 'PLAYING ECHO' : `${post.content.acousticEcho.duration}s`}
              </span>
            </div>

            {/* Interactive Dynamic Waveform Bars */}
            <div className="flex items-end gap-1 h-6 pt-1">
              {post.content.acousticEcho.frequencyWave.map((h, i) => {
                const isActive = (i / post.content.acousticEcho!.frequencyWave.length) * 100 <= audioProgress;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-full transition-all duration-200 ${
                      isActive
                        ? 'bg-gradient-to-t from-purple-500 to-cyan-400'
                        : 'bg-purple-950/70 hover:bg-purple-800'
                    }`}
                    style={{
                      height: isPlayingAudio ? `${Math.max(15, (h * (Math.sin(Date.now() / 150 + i) + 1.2)) / 2)}%` : `${h}%`,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Social Action Bar */}
      <div className="p-4 sm:px-5 sm:pt-4 sm:pb-3 flex items-center justify-between">
        <div className="flex items-center gap-4 sm:gap-6">
          {/* Like Button */}
          <button
            onClick={() => toggleLikePost(post.id)}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-rose-400 transition-colors group focus:outline-none"
          >
            <Heart
              className={`w-5 h-5 transition-transform duration-200 group-hover:scale-125 ${
                post.isLiked
                  ? 'text-rose-500 fill-rose-500 filter drop-shadow-[0_0_10px_rgba(244,63,94,0.6)]'
                  : ''
              }`}
            />
            <span className="text-xs font-bold text-white">
              {post.metrics.likes.toLocaleString()}
            </span>
          </button>

          {/* Echo Shift Counter (The unique metric!) */}
          <button
            onClick={toggleRealityShift}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-cyan-300 transition-colors group focus:outline-none"
            title="Pioneers who peeled reality"
          >
            <Layers className="w-5 h-5 text-cyan-400 transition-transform group-hover:rotate-12" />
            <span className="text-xs font-bold text-cyan-300 font-mono">
              {post.metrics.echoShifts.toLocaleString()}
            </span>
          </button>

          {/* Comments Toggle */}
          <button
            onClick={() => setIsCommentsOpen(!isCommentsOpen)}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-purple-300 transition-colors group focus:outline-none"
          >
            <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
            <span className="text-xs font-bold text-white">
              {post.metrics.commentsCount.toLocaleString()}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-zinc-300 hover:text-purple-300 transition-colors group focus:outline-none relative"
          >
            <Share2 className="w-5 h-5 transition-transform group-hover:scale-110" />
            {copiedLink && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 text-[10px] bg-purple-600 text-white px-2 py-0.5 rounded-md whitespace-nowrap animate-fadeIn">
                Link Copied!
              </span>
            )}
          </button>
        </div>

        {/* Bookmark / Save */}
        <button
          onClick={() => toggleSavePost(post.id)}
          className="text-zinc-300 hover:text-purple-300 transition-colors focus:outline-none"
        >
          <Bookmark
            className={`w-5 h-5 ${
              post.isSaved
                ? 'text-purple-400 fill-purple-400 filter drop-shadow-[0_0_10px_rgba(168,85,247,0.6)]'
                : ''
            }`}
          />
        </button>
      </div>

      {/* Caption & Echo Notes */}
      <div className="px-4 sm:px-5 pb-4 space-y-2 text-left">
        {/* Caption text switches dynamically when user peels the reality slider! */}
        <p className="text-xs sm:text-sm text-zinc-200 leading-relaxed">
          <span className="font-bold text-white mr-2">@{post.author.username}</span>
          {isEchoActive ? (
            <span className="text-cyan-200 italic font-mono">
              [Raw Echo] {post.content.echoCaption}
            </span>
          ) : (
            post.content.caption
          )}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 pt-1">
          {post.content.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] font-semibold text-purple-400 hover:text-purple-300 cursor-pointer"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Post Timestamp */}
        <div className="text-[10px] text-zinc-500 uppercase tracking-widest pt-1">
          {post.createdAt} • SYNCHRONIZED ACROSS PROTOCOL
        </div>
      </div>

      {/* Interactive Comments Drawer */}
      {isCommentsOpen && (
        <div className="border-t border-purple-500/15 p-4 sm:p-5 bg-void-950/60 backdrop-blur-md text-left space-y-3 animate-fadeIn">
          <div className="max-h-56 overflow-y-auto space-y-3 pr-1">
            {post.comments.length === 0 ? (
              <p className="text-xs text-zinc-500 italic py-2 text-center">
                No resonances yet. Be the first to leave an acoustic thought.
              </p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="flex items-start gap-2.5 text-xs">
                  <img
                    src={comment.author.avatarUrl}
                    alt={comment.author.name}
                    className="w-7 h-7 rounded-full object-cover ring-1 ring-purple-500/40"
                  />
                  <div className="flex-1 bg-void-900/80 p-2.5 rounded-2xl border border-purple-500/15">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-[11px]">
                        @{comment.author.username}
                      </span>
                      <span className="text-[10px] text-zinc-500">{comment.timestamp}</span>
                    </div>
                    <p className="text-zinc-200 text-xs">{comment.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* New Comment Input */}
          <form onSubmit={handleCommentSubmit} className="flex items-center gap-2 pt-2">
            <input
              type="text"
              placeholder="Leave a resonant thought..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              className="flex-1 rounded-xl bg-void-900 border border-purple-500/25 px-3.5 py-2 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!commentInput.trim()}
              className="p-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </article>
  );
};
