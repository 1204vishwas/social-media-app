import React from 'react';
import { Sparkles, ShieldCheck, Radio, Flame, MessageSquare, Heart, Share2 } from 'lucide-react';

export const BrandHero: React.FC = () => {
  return (
    <div className="hidden lg:flex flex-col justify-between p-12 xl:p-16 h-full relative z-10 text-left">
      {/* Brand Header */}
      <div>
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-full bg-void-800/90 border border-purple-500/30 backdrop-blur-md mb-8 shadow-glow-sm">
          <span className="flex h-2 w-2 rounded-full bg-purple-400 animate-ping" />
          <span className="text-xs font-semibold text-purple-200 tracking-wider uppercase">
            Aura Next-Gen Network 2.0
          </span>
        </div>

        <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Where Digital <br />
          <span className="purple-gradient-text drop-shadow-[0_0_35px_rgba(168,85,247,0.4)]">
            Consciousness
          </span>{' '}
          Connects.
        </h1>

        <p className="mt-4 text-base text-purple-200/70 max-w-md leading-relaxed font-normal">
          Escape the algorithm noise. Discover uncensored thoughts, immersive spatial vibes, and genuine human connection wrapped in deep obsidian aesthetic.
        </p>

        {/* Feature badges */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-300 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Zero Surveillance
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-cyan-300 font-medium">
            <Radio className="w-3.5 h-3.5 text-cyan-400" /> Spatial Audio Nodes
          </span>
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200 font-medium">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" /> AI Echo Curation
          </span>
        </div>
      </div>

      {/* Floating Interactive Live Post Mockup */}
      <div className="my-10 relative">
        {/* Glowing backdrop pill */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/30 to-sky-500/20 rounded-3xl blur-xl opacity-75" />

        <div className="relative glass-panel rounded-2xl p-5 border border-purple-500/30 shadow-2xl transition-all duration-300 hover:border-purple-400/50">
          <div className="flex items-center justify-between mb-3.5">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                  alt="Elena Vance"
                  className="w-10 h-10 rounded-full object-cover ring-2 ring-purple-500/60"
                />
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full ring-2 ring-void-900" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold text-white">Elena Vance</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-500/20 text-purple-300 font-semibold border border-purple-400/30">
                    PRO
                  </span>
                </div>
                <span className="text-xs text-purple-300/60">@elena_vance • 4m ago</span>
              </div>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-purple-900/30 text-[11px] text-purple-300 font-medium border border-purple-500/20">
              <Flame className="w-3 h-3 text-amber-400 fill-amber-400" /> Trending in #CyberDesign
            </span>
          </div>

          <p className="text-xs text-zinc-200 leading-relaxed">
            "The feeling when an interface breathes with deep obsidian depths and neon purple pulses... We’re finally building social spaces that feel like home for nocturnal minds."
          </p>

          <div className="mt-3.5 pt-3 border-t border-purple-500/10 flex items-center justify-between text-xs text-purple-300/70">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5 hover:text-purple-300 transition-colors cursor-pointer">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/30" /> 2.4k
              </span>
              <span className="flex items-center gap-1.5 hover:text-purple-300 transition-colors cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5 text-purple-400" /> 389
              </span>
              <span className="flex items-center gap-1.5 hover:text-purple-300 transition-colors cursor-pointer">
                <Share2 className="w-3.5 h-3.5 text-cyan-400" /> 142
              </span>
            </div>
            <span className="text-[11px] text-cyan-300 font-mono">14.8k impressions</span>
          </div>
        </div>
      </div>

      {/* Social Proof Footer */}
      <div className="flex items-center gap-4 pt-4 border-t border-purple-500/15">
        <div className="flex -space-x-2.5 overflow-hidden">
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-void-900 object-cover"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
            alt="User"
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-void-900 object-cover"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=80"
            alt="User"
          />
          <img
            className="inline-block h-8 w-8 rounded-full ring-2 ring-void-900 object-cover"
            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=80"
            alt="User"
          />
          <div className="flex items-center justify-center h-8 w-8 rounded-full bg-purple-700/60 ring-2 ring-void-900 text-[10px] font-bold text-white">
            +500k
          </div>
        </div>

        <div className="text-xs">
          <div className="font-semibold text-white">Joined by creators worldwide</div>
          <div className="text-purple-300/60 text-[11px]">Daily active thinkers & creative pioneers</div>
        </div>
      </div>
    </div>
  );
};
