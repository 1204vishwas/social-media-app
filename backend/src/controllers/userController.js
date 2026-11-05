import { db } from '../config/db.js';

export const getUserProfile = (username) => {
  const user = db.users.find((u) => u.username.toLowerCase() === username.toLowerCase()) || db.users[0];
  const userPosts = db.posts.filter((p) => p.authorUsername.toLowerCase() === user.username.toLowerCase());

  return {
    success: true,
    user,
    posts: userPosts,
  };
};

export const updateBio = (bio, userId = 'usr_me') => {
  const user = db.users.find((u) => u.id === userId) || db.users[0];
  user.bio = bio;

  return {
    success: true,
    user,
  };
};
