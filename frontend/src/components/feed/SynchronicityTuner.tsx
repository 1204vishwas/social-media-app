import React from 'react';
import { Sparkles, Radio, Zap, Moon, Wind, Compass } from 'lucide-react';
import { VibeWavelength } from '../../types/social';
import { useSocial } from '../../context/SocialContext';

export const SynchronicityTuner: React.FC = () => {
  const { activeWavelength, setWavelength } = useSocial();

  const frequencies: { id: VibeWavelength; label: string; icon: React.ReactNode; glowColor: string }[] = [
    {
      id: 'all',
      label: 'Omni Spectrum',
      icon: <Compass className="w-3.5 h-3.5" />,
      glowColor: 'from-purple-500 to-indigo-500',
    },
    {
      id: 'cosmic',
      label: 'Cosmic Void',
      icon: <Moon className="w-3.5 h-3.5" />,
      glowColor: 'from-indigo-600 to-blue-500',
    },
    {
      id: 'voltage',
      label: 'High Voltage',
      icon: <Zap className="w-3.5 h-3.5" />,
      glowColor: 'from-fuchsia-500 to-amber-400',
    },
    {
      id: 'violet',
      label: 'Violet Dream',
      icon: <Radio className="w-3.5 h-3.5" />,
      glowColor: 'from-purple-600 to-purple-400',
    },
    {
      id: 'serenity',
      label: 'Lucid Serenity',
      icon: <Wind className="w-3.5 h-3.5" />,
      glowColor: 'from-cyan-500 to-emerald-400',
    },
  ];

  return (
    <div className="w-full glass-panel-subtle rounded-2xl p-2 sm:p-3 border border-purple-500/20 shadow-lg backdrop-blur-xl mb-6">
      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-[11px] font-bold text-white uppercase tracking-wider">
            Synchronicity Resonance Dial
          </span>
        </div>
        <span className="text-[10px] text-purple-300/70 font-mono hidden sm:inline">
          Filter by Emotional Wavelength
        </span>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {frequencies.map((freq) => {
          const isActive = activeWavelength === freq.id;
          return (
            <button
              key={freq.id}
              onClick={() => setWavelength(freq.id)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-300 select-none ${
                isActive
                  ? `bg-gradient-to-r ${freq.glowColor} text-white shadow-md shadow-purple-900/50 scale-105 border border-white/30`
                  : 'bg-void-900/80 text-zinc-400 hover:text-purple-200 hover:bg-void-800 border border-purple-500/15'
              }`}
            >
              <span>{freq.icon}</span>
              <span>{freq.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
