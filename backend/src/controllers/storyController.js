import { db } from '../config/db.js';

export const getStories = () => {
  return {
    success: true,
    stories: db.stories,
  };
};

export const createStory = (body, user) => {
  const author = user || db.users[0];
  const { mediaUrl, caption, musicTitle, vibe } = body;

  const newStory = {
    id: 'story_' + Date.now(),
    authorId: author.id,
    authorName: author.name,
    authorUsername: author.username,
    authorAvatar: author.avatarUrl,
    mediaUrl: mediaUrl || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600',
    caption: caption || '',
    musicTitle: musicTitle || 'Aura Ambient Frequency',
    vibe: vibe || 'voltage',
    seenBy: [],
    createdAt: 'Just now',
  };

  db.stories.unshift(newStory);
  return {
    success: true,
    story: newStory,
  };
};
