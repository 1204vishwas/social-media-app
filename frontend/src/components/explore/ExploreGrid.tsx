import React, { useState } from 'react';
import { Search, Heart, Layers, Sparkles, Filter, Music, Compass } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';
import { Post } from '../../types/social';
import { DualPrismPost } from '../feed/DualPrismPost';

export const ExploreGrid: React.FC = () => {
  const { posts } = useSocial();
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const categories = ['All', 'Dual Echoes', 'Cyberpunk', 'Generative', 'Audio Spheres', 'Nocturnal', 'Serenity'];

  // Media pool combined from posts
  const exploreItems = [
    {
      id: 'exp_1',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=600&auto=format&fit=crop&q=80',
      title: 'Neon District 7',
      likes: '3.4k',
      echoes: '1.2k',
      isFeatured: true,
      hasAudio: true,
      category: 'Cyberpunk',
      post: posts[0],
    },
    {
      id: 'exp_2',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=80',
      title: 'Liquid Shaders',
      likes: '9.2k',
      echoes: '4.8k',
      isFeatured: false,
      hasAudio: false,
      category: 'Generative',
      post: posts[1],
    },
    {
      id: 'exp_3',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&auto=format&fit=crop&q=80',
      title: 'Retro Neural Setup',
      likes: '14.1k',
      echoes: '6.2k',
      isFeatured: false,
      hasAudio: true,
      category: 'Audio Spheres',
      post: posts[0],
    },
    {
      id: 'exp_4',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80',
      title: 'Oceanic Breathing',
      likes: '24k',
      echoes: '14k',
      isFeatured: true,
      hasAudio: true,
      category: 'Serenity',
      post: posts[2],
    },
    {
      id: 'exp_5',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80',
      title: 'Neo-Kyoto Lights',
      likes: '5.8k',
      echoes: '2.1k',
      isFeatured: false,
      hasAudio: false,
      category: 'Nocturnal',
      post: posts[0],
    },
    {
      id: 'exp_6',
      type: 'image',
      url: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&auto=format&fit=crop&q=80',
      title: 'Modular Analog Wall',
      likes: '1.8k',
      echoes: '840',
      isFeatured: false,
      hasAudio: true,
      category: 'Audio Spheres',
      post: posts[3] || posts[0],
    },
  ];

  const filteredItems = exploreItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pb-20 text-left">
      {/* Search Header */}
      <div className="relative">
        <Search className="w-5 h-5 text-purple-400 absolute left-4 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search creators, audio frequencies, #DualPrism tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full glass-input rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:border-purple-400"
        />
      </div>

      {/* Categories Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              activeCategory === cat
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-glow-sm'
                : 'bg-void-900/80 text-zinc-400 hover:text-purple-200 border border-purple-500/20'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dynamic Masonry-Style Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
        {filteredItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => setSelectedPost(item.post)}
            className={`relative rounded-3xl overflow-hidden glass-panel border border-purple-500/25 group cursor-pointer shadow-lg hover:border-purple-400 transition-all duration-300 ${
              item.isFeatured ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'
            }`}
          >
            <img
              src={item.url}
              alt={item.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />

            {/* Audio Indicator */}
            {item.hasAudio && (
              <div className="absolute top-3 right-3 p-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-purple-500/30 text-cyan-300">
                <Music className="w-3.5 h-3.5" />
              </div>
            )}

            {/* Hover Holographic Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end">
              <span className="text-xs font-bold text-white tracking-wide truncate">
                {item.title}
              </span>
              <div className="flex items-center gap-4 text-xs font-mono mt-1">
                <span className="flex items-center gap-1 text-rose-400">
                  <Heart className="w-3.5 h-3.5 fill-rose-400/40" /> {item.likes}
                </span>
                <span className="flex items-center gap-1 text-cyan-300">
                  <Layers className="w-3.5 h-3.5" /> {item.echoes}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Selected Post Modal (Full detail inspection) */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-xl max-h-[90vh] overflow-y-auto no-scrollbar relative">
            <button
              onClick={() => setSelectedPost(null)}
              className="absolute top-3 right-3 z-30 p-2 rounded-full bg-black/80 text-white hover:bg-black transition-colors"
            >
              ✕
            </button>
            <DualPrismPost post={selectedPost} />
          </div>
        </div>
      )}
    </div>
  );
};
