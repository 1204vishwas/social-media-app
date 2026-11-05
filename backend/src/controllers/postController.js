import { db } from '../config/db.js';

export const getFeed = (vibe) => {
  let posts = [...db.posts];
  if (vibe && vibe !== 'all') {
    posts = posts.filter((p) => p.content.vibeFrequency === vibe);
  }
  return {
    success: true,
    count: posts.length,
    posts,
  };
};

export const createPost = (body, user) => {
  const author = user || db.users[0];
  const { content } = body;

  if (!content?.canvasImage || !content?.caption) {
    throw new Error('Canvas image and caption are required.');
  }

  const newPost = {
    id: 'post_' + Date.now(),
    authorId: author.id,
    authorName: author.name,
    authorUsername: author.username,
    authorAvatar: author.avatarUrl,
    isVerified: author.isVerified,
    content: {
      canvasImage: content.canvasImage,
      caption: content.caption,
      echoImage: content.echoImage || content.canvasImage,
      echoCaption: content.echoCaption || 'Raw echo perspective.',
      rawThoughtLog: content.rawThoughtLog || 'Live Dual Prism Protocol Capture',
      acousticEcho: content.acousticEcho,
      vibeFrequency: content.vibeFrequency || 'cosmic',
      tags: content.tags || ['#DualPrism', '#AuraNetwork'],
      location: content.location || 'Neo-Tokyo',
    },
    metrics: {
      likes: 0,
      echoShifts: 0,
      commentsCount: 0,
      shares: 0,
      views: 1,
    },
    likedBy: [],
    savedBy: [],
    comments: [],
    createdAt: 'Just now',
  };

  db.posts.unshift(newPost);
  return {
    success: true,
    post: newPost,
  };
};

export const toggleLike = (postId, userId = 'usr_me') => {
  const post = db.posts.find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');

  const idx = post.likedBy.indexOf(userId);
  if (idx === -1) {
    post.likedBy.push(userId);
    post.metrics.likes += 1;
  } else {
    post.likedBy.splice(idx, 1);
    post.metrics.likes = Math.max(0, post.metrics.likes - 1);
  }

  return {
    success: true,
    isLiked: idx === -1,
    likes: post.metrics.likes,
  };
};

export const toggleSave = (postId, userId = 'usr_me') => {
  const post = db.posts.find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');

  const idx = post.savedBy.indexOf(userId);
  if (idx === -1) {
    post.savedBy.push(userId);
  } else {
    post.savedBy.splice(idx, 1);
  }

  return {
    success: true,
    isSaved: idx === -1,
  };
};

export const recordEchoShift = (postId) => {
  const post = db.posts.find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');

  post.metrics.echoShifts += 1;
  return {
    success: true,
    echoShifts: post.metrics.echoShifts,
  };
};

export const addComment = (postId, text, user) => {
  const author = user || db.users[0];
  const post = db.posts.find((p) => p.id === postId);
  if (!post) throw new Error('Post not found');

  const newComment = {
    id: 'c_' + Date.now(),
    authorId: author.id,
    authorName: author.name,
    authorUsername: author.username,
    authorAvatar: author.avatarUrl,
    text: text.trim(),
    timestamp: 'Just now',
    likes: 0,
  };

  post.comments.unshift(newComment);
  post.metrics.commentsCount += 1;

  return {
    success: true,
    comment: newComment,
  };
};
