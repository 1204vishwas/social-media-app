import React, { useState } from 'react';
import {
  X,
  Sparkles,
  Layers,
  Image as ImageIcon,
  Mic,
  Sliders,
  Send,
  MapPin,
  Tag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { useSocial } from '../../context/SocialContext';
import { DualPrismContent } from '../../types/social';
import { soundEngine } from '../../utils/soundEngine';

export const CreatePostModal: React.FC = () => {
  const { isCreateModalOpen, closeCreateModal, createPost } = useSocial();

  const [canvasImage, setCanvasImage] = useState<string>(
    'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1000&auto=format&fit=crop&q=80'
  );
  const [echoImage, setEchoImage] = useState<string>(
    'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80'
  );
  const [caption, setCaption] = useState<string>('Reflecting through neon dimensions. What frequencies are you tuned into?');
  const [echoCaption, setEchoCaption] = useState<string>('The raw reality: took 5 hours in the freezing rain to capture this reflection.');
  const [vibeFrequency, setVibeFrequency] = useState<'cosmic' | 'voltage' | 'violet' | 'serenity'>('cosmic');
  const [location, setLocation] = useState<string>('Neo-Kyoto • District 4');
  const [previewSplit, setPreviewSplit] = useState<number>(35);

  if (!isCreateModalOpen) return null;

  // Preset images for instant one-click testing
  const presets = [
    {
      name: 'Cyber Horizon',
      canvas: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=1000&auto=format&fit=crop&q=80',
      echo: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1000&auto=format&fit=crop&q=80',
      vibe: 'cosmic' as const,
    },
    {
      name: 'Violet Shaders',
      canvas: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=1000&auto=format&fit=crop&q=80',
      echo: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
      vibe: 'violet' as const,
    },
    {
      name: 'Analog Voltage',
      canvas: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=1000&auto=format&fit=crop&q=80',
      echo: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=1000&auto=format&fit=crop&q=80',
      vibe: 'voltage' as const,
    },
    {
      name: 'Serene Waves',
      canvas: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&auto=format&fit=crop&q=80',
      echo: 'https://images.unsplash.com/photo-1476673160081-cf065607f449?w=1000&auto=format&fit=crop&q=80',
      vibe: 'serenity' as const,
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canvasImage || !caption) return;

    const newContent: DualPrismContent = {
      canvasImage,
      caption,
      echoImage: echoImage || canvasImage,
      echoCaption: echoCaption || 'Raw unfiltered perspective.',
      rawThoughtLog: 'Recorded live via Aura Dual Prism Protocol',
      acousticEcho: {
        title: 'Original Echo Memo (Live Field Capture)',
        artist: 'Vishu Sharma',
        duration: 16,
        frequencyWave: [40, 60, 85, 100, 75, 45, 90, 80, 65, 50, 70, 95, 40],
      },
      vibeFrequency,
      tags: ['#DualPrism', `#${vibeFrequency.toUpperCase()}`, '#AuraNetwork'],
      location,
    };

    createPost(newContent);
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.5 },
      colors: ['#c084fc', '#38bdf8', '#a855f7'],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-xl animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto no-scrollbar glass-panel rounded-3xl border border-purple-500/30 p-5 sm:p-7 shadow-2xl relative text-left space-y-5">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-3 border-b border-purple-500/15">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300">
              <Layers className="w-5 h-5 text-cyan-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Dual Prism Creator Studio</h2>
              <p className="text-xs text-purple-200/70">
                Mint a dual-layer reality: Curated Canvas + Raw Echo
              </p>
            </div>
          </div>

          <button
            onClick={closeCreateModal}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Style Presets */}
        <div>
          <label className="block text-xs font-semibold text-purple-300 mb-2">
            Instant Presets (Or customize below):
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.name}
                type="button"
                onClick={() => {
                  soundEngine.playClick();
                  setCanvasImage(preset.canvas);
                  setEchoImage(preset.echo);
                  setVibeFrequency(preset.vibe);
                }}
                className="p-2.5 rounded-xl bg-void-900 border border-purple-500/20 hover:border-purple-400 text-left transition-all group"
              >
                <div className="text-xs font-bold text-white group-hover:text-purple-300 truncate">
                  {preset.name}
                </div>
                <div className="text-[10px] text-zinc-400 uppercase mt-0.5">
                  {preset.vibe}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dual Prism Live Preview & Split Test */}
        <div className="space-y-2">
          <label className="block text-xs font-semibold text-purple-300 flex items-center justify-between">
            <span>Dual Reality Splitter Live Preview:</span>
            <span className="text-cyan-300 font-mono text-[11px]">
              Split: {previewSplit}%
            </span>
          </label>

          <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden bg-void-950 border border-purple-500/30">
            {/* Canvas */}
            <img src={canvasImage} alt="Canvas" className="absolute inset-0 w-full h-full object-cover" />
            
            {/* Echo Layer */}
            <div
              className="absolute inset-0 overflow-hidden pointer-events-none"
              style={{ clipPath: `inset(0 0 0 ${100 - previewSplit}%)` }}
            >
              <img src={echoImage} alt="Echo" className="absolute inset-0 w-full h-full object-cover filter contrast-120 saturate-125" />
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 text-[10px] font-bold text-cyan-300">
                RAW ECHO LAYER
              </div>
            </div>

            {/* Splitter Line */}
            <div
              className="absolute top-0 bottom-0 w-0.5 bg-cyan-400 shadow-[0_0_10px_#38bdf8] pointer-events-none"
              style={{ left: `${previewSplit}%` }}
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-[11px] text-zinc-400">Canvas</span>
            <input
              type="range"
              min="0"
              max="100"
              value={previewSplit}
              onChange={(e) => setPreviewSplit(Number(e.target.value))}
              className="flex-1 prism-slider"
            />
            <span className="text-[11px] text-cyan-300 font-bold">Raw Echo</span>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Layer 1: Canvas Image URL (Curated)
              </label>
              <input
                type="text"
                value={canvasImage}
                onChange={(e) => setCanvasImage(e.target.value)}
                className="w-full bg-void-900 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-cyan-300 mb-1">
                Layer 2: Raw Echo Image URL (Behind the Scenes)
              </label>
              <input
                type="text"
                value={echoImage}
                onChange={(e) => setEchoImage(e.target.value)}
                className="w-full bg-void-900 border border-cyan-500/30 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Curated Caption
            </label>
            <textarea
              rows={2}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="What do you present to the timeline?"
              className="w-full bg-void-900 border border-purple-500/20 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-cyan-300 mb-1">
              Raw Echo Monologue (Revealed upon splitting)
            </label>
            <textarea
              rows={2}
              value={echoCaption}
              onChange={(e) => setEchoCaption(e.target.value)}
              placeholder="The authentic, unfiltered story behind this creation..."
              className="w-full bg-void-900 border border-cyan-500/30 rounded-xl p-3 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Location Resonance
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 text-purple-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-void-900 border border-purple-500/20 rounded-xl pl-9 pr-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Vibe Wavelength
              </label>
              <select
                value={vibeFrequency}
                onChange={(e) => setVibeFrequency(e.target.value as any)}
                className="w-full bg-void-900 border border-purple-500/20 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
              >
                <option value="cosmic">🌌 Cosmic Void (Nocturnal)</option>
                <option value="voltage">⚡ High Voltage (Energy)</option>
                <option value="violet">🔮 Violet Dream (Aesthetic)</option>
                <option value="serenity">🌿 Lucid Serenity (Calm)</option>
              </select>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={closeCreateModal}
              className="px-5 py-2.5 rounded-xl text-xs text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-indigo-600 hover:brightness-110 text-white font-semibold text-xs shadow-lg shadow-purple-900/50 transition-all active:scale-98"
            >
              <Sparkles className="w-4 h-4" />
              <span>Mint to Aura Network</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
