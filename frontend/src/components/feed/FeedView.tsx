import React from 'react';
import { StoriesBar } from '../stories/StoriesBar';
import { SynchronicityTuner } from './SynchronicityTuner';
import { DualPrismPost } from './DualPrismPost';
import { useSocial } from '../../context/SocialContext';
import { Sparkles, Layers } from 'lucide-react';

export const FeedView: React.FC = () => {
  const { posts, activeWavelength, setWavelength } = useSocial();

  const filteredPosts = posts.filter(
    (p) => activeWavelength === 'all' || p.content.vibeFrequency === activeWavelength
  );

  return (
    <div className="w-full max-w-xl mx-auto space-y-6 pb-24">
      {/* Stories Bar */}
      <StoriesBar />

      {/* Synchronicity Frequency Tuner (Emotional Wavelength) */}
      <SynchronicityTuner />

      {/* Posts Stream */}
      <div className="space-y-6">
        {filteredPosts.length === 0 ? (
          <div className="glass-panel rounded-3xl p-8 border border-purple-500/20 text-center space-y-3">
            <Sparkles className="w-10 h-10 text-purple-400 mx-auto animate-pulse" />
            <h3 className="text-base font-bold text-white">No Echoes in this Frequency</h3>
            <p className="text-xs text-zinc-400 max-w-xs mx-auto">
              There are currently no broadcasts on the {activeWavelength} wavelength.
            </p>
            <button
              onClick={() => setWavelength('all')}
              className="px-4 py-2 rounded-xl bg-purple-600/40 border border-purple-400/30 text-xs text-white hover:bg-purple-600/70 transition-colors"
            >
              Return to Omni Spectrum
            </button>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <DualPrismPost key={post.id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};
