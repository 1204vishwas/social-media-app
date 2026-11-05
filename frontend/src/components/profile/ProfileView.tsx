import React, { useState } from 'react';
import {
  Grid,
  Bookmark,
  Layers,
  Settings,
  Share2,
  CheckCircle2,
  Sparkles,
  Play,
  Heart,
  MessageCircle,
  Link as LinkIcon,
  Radio,
  Edit3
} from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { useAuth } from '../../context/AuthContext';
import { soundEngine } from '../../utils/soundEngine';

export const ProfileView: React.FC = () => {
  const { currentUser, posts, reels } = useSocial();
  const { logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'posts' | 'reels' | 'saved' | 'echoes'>('posts');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [bioText, setBioText] = useState<string>(currentUser.bio || '');

  const myPosts = posts.filter((p) => p.author.username === currentUser.username || p.author.id === currentUser.id);
  const savedPosts = posts.filter((p) => p.isSaved);

  // Story highlights
  const highlights = [
    { title: 'Synth Wave', img: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=200' },
    { title: 'Shaders', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200' },
    { title: 'Tokyo Lab', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=200' },
    { title: 'Midnight', img: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=200' },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 text-left">
      {/* Profile Header Card */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-2xl relative">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
          {/* Avatar with Dual Reality Aura Ring */}
          <div className="relative group cursor-pointer">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl p-1 bg-gradient-to-tr from-purple-500 via-cyan-400 to-fuchsia-500 shadow-glow-md">
              <img
                src={currentUser.avatarUrl}
                alt={currentUser.name}
                className="w-full h-full rounded-[20px] object-cover"
              />
            </div>
            <div className="absolute -bottom-2 right-1/2 translate-x-1/2 sm:translate-x-0 sm:-right-2 p-1.5 rounded-full bg-void-950 border border-purple-500/40 text-cyan-300">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>

          {/* User Details */}
          <div className="flex-1 text-center sm:text-left space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center justify-center sm:justify-start gap-2">
                  <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
                    {currentUser.name}
                  </h1>
                  {currentUser.isVerified && (
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
                  )}
                </div>
                <div className="text-xs text-purple-400 font-mono mt-0.5">
                  @{currentUser.username} • Level 9 Creator
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-2">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-void-850 hover:bg-purple-950/60 border border-purple-500/30 text-xs font-semibold text-white transition-all"
                >
                  <Edit3 className="w-3.5 h-3.5 text-purple-300" />
                  <span>{isEditing ? 'Save Bio' : 'Edit Profile'}</span>
                </button>
                <button
                  onClick={logout}
                  className="px-3.5 py-2 rounded-xl bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/30 text-xs font-semibold text-rose-300 transition-all"
                >
                  Sign Out
                </button>
              </div>
            </div>

            {/* Bio */}
            {isEditing ? (
              <textarea
                value={bioText}
                onChange={(e) => setBioText(e.target.value)}
                className="w-full bg-void-900 border border-purple-500/30 rounded-xl p-2.5 text-xs text-white focus:outline-none focus:border-cyan-400"
                rows={2}
              />
            ) : (
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                {bioText}
              </p>
            )}

            <div className="flex items-center justify-center sm:justify-start gap-2 text-xs text-cyan-400">
              <LinkIcon className="w-3.5 h-3.5" />
              <a href="#protocol" className="hover:underline">
                https://aura.social/@{currentUser.username}
              </a>
            </div>

            {/* Stats Metrics */}
            <div className="flex items-center justify-center sm:justify-start gap-6 pt-2 border-t border-purple-500/15">
              <div>
                <span className="font-extrabold text-white text-base mr-1">
                  {myPosts.length}
                </span>
                <span className="text-xs text-zinc-400">Creations</span>
              </div>
              <div>
                <span className="font-extrabold text-white text-base mr-1">
                  {currentUser.followersCount.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">Resonators</span>
              </div>
              <div>
                <span className="font-extrabold text-white text-base mr-1">
                  {currentUser.followingCount.toLocaleString()}
                </span>
                <span className="text-xs text-zinc-400">Following</span>
              </div>
            </div>
          </div>
        </div>

        {/* Story Highlights */}
        <div className="mt-6 pt-6 border-t border-purple-500/15">
          <div className="text-[11px] font-bold text-purple-300 uppercase tracking-wider mb-3">
            Spatial Echo Highlights
          </div>
          <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-1">
            {highlights.map((h) => (
              <div key={h.title} className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group">
                <div className="w-14 h-14 rounded-2xl p-0.5 border border-purple-500/40 group-hover:border-cyan-400 transition-colors">
                  <img src={h.img} alt={h.title} className="w-full h-full rounded-[14px] object-cover" />
                </div>
                <span className="text-[10px] text-zinc-400 group-hover:text-white truncate max-w-[64px]">
                  {h.title}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs Switcher */}
      <div className="flex items-center justify-around border-b border-purple-500/20 text-xs font-semibold">
        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('posts');
          }}
          className={`flex items-center gap-2 py-3 border-b-2 transition-all ${
            activeTab === 'posts'
              ? 'border-purple-400 text-white shadow-glow-sm'
              : 'border-transparent text-zinc-400 hover:text-purple-200'
          }`}
        >
          <Grid className="w-4 h-4" />
          <span>Canvas Grid</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('reels');
          }}
          className={`flex items-center gap-2 py-3 border-b-2 transition-all ${
            activeTab === 'reels'
              ? 'border-purple-400 text-white shadow-glow-sm'
              : 'border-transparent text-zinc-400 hover:text-purple-200'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>Pulse Reels</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('echoes');
          }}
          className={`flex items-center gap-2 py-3 border-b-2 transition-all ${
            activeTab === 'echoes'
              ? 'border-cyan-400 text-cyan-300 shadow-glow-cyan'
              : 'border-transparent text-zinc-400 hover:text-cyan-200'
          }`}
        >
          <Layers className="w-4 h-4 text-cyan-400" />
          <span>Dual Echoes</span>
        </button>

        <button
          onClick={() => {
            soundEngine.playClick();
            setActiveTab('saved');
          }}
          className={`flex items-center gap-2 py-3 border-b-2 transition-all ${
            activeTab === 'saved'
              ? 'border-purple-400 text-white shadow-glow-sm'
              : 'border-transparent text-zinc-400 hover:text-purple-200'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>Saved</span>
        </button>
      </div>

      {/* Tab Content Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {activeTab === 'posts' && (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden glass-panel border border-purple-500/20 group cursor-pointer"
            >
              <img
                src={post.content.canvasImage}
                alt={post.content.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4 text-xs font-bold text-white">
                <span className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                  {post.metrics.likes}
                </span>
                <span className="flex items-center gap-1">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  {post.metrics.echoShifts}
                </span>
              </div>
            </div>
          ))
        )}

        {activeTab === 'reels' && (
          reels.map((reel) => (
            <div
              key={reel.id}
              className="relative aspect-[9/16] rounded-2xl overflow-hidden glass-panel border border-purple-500/20 group cursor-pointer"
            >
              <img
                src={reel.posterUrl}
                alt={reel.caption}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <div className="absolute bottom-2 left-2 text-[11px] font-bold text-white flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-md">
                <Play className="w-3 h-3 fill-white" />
                {reel.metrics.likes}
              </div>
            </div>
          ))
        )}

        {activeTab === 'echoes' && (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden glass-panel border border-cyan-500/30 group cursor-pointer"
            >
              <img
                src={post.content.echoImage}
                alt="Raw Echo"
                className="w-full h-full object-cover filter contrast-125"
              />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-400/40 text-[9px] font-bold text-cyan-300">
                RAW ECHO
              </div>
            </div>
          ))
        )}

        {activeTab === 'saved' && (
          savedPosts.map((post) => (
            <div
              key={post.id}
              className="relative aspect-square rounded-2xl overflow-hidden glass-panel border border-purple-500/20 group cursor-pointer"
            >
              <img
                src={post.content.canvasImage}
                alt={post.content.caption}
                className="w-full h-full object-cover"
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};
