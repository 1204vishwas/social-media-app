import { db } from '../config/db.js';

export const getReels = () => {
  return {
    success: true,
    reels: db.reels,
  };
};

export const toggleLikeReel = (reelId, userId = 'usr_me') => {
  const reel = db.reels.find((r) => r.id === reelId);
  if (!reel) throw new Error('Reel not found');

  const idx = reel.likedBy.indexOf(userId);
  if (idx === -1) {
    reel.likedBy.push(userId);
    reel.metrics.likes += 1;
  } else {
    reel.likedBy.splice(idx, 1);
    reel.metrics.likes = Math.max(0, reel.metrics.likes - 1);
  }

  return {
    success: true,
    isLiked: idx === -1,
    likes: reel.metrics.likes,
  };
};
