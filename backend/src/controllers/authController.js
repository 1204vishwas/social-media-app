import { db } from '../config/db.js';

export const register = (body) => {
  const { name, username, email, password } = body;

  if (!email || !name) {
    throw new Error('Name and email are required.');
  }

  const existing = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    throw new Error('An account with this email already exists.');
  }

  const newUser = {
    id: 'usr_' + Date.now(),
    name,
    username: username || email.split('@')[0],
    email,
    password: password || 'defaultPass',
    avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    provider: 'local',
    bio: 'Just arrived at AURA! Ready to connect. ✨',
    followersCount: 0,
    followingCount: 0,
    isVerified: false,
    createdAt: new Date().toISOString(),
  };

  db.users.push(newUser);
  return {
    success: true,
    user: newUser,
    token: 'aura_token_' + newUser.id,
  };
};

export const login = (body) => {
  const { email } = body;
  const user = db.users.find((u) => u.email.toLowerCase() === email?.toLowerCase()) || db.users[0];

  return {
    success: true,
    user,
    token: 'aura_token_' + user.id,
  };
};

export const googleAuth = (body) => {
  const { name, email, avatarUrl } = body;

  let user = db.users.find((u) => u.email.toLowerCase() === email?.toLowerCase());
  if (!user) {
    user = {
      id: 'goog_' + Date.now(),
      name: name || 'Google Explorer',
      username: (email?.split('@')[0] || 'aura_user').toLowerCase().replace(/[^a-z0-9_]/g, ''),
      email: email || 'user@gmail.com',
      avatarUrl: avatarUrl || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150',
      provider: 'google',
      bio: 'Verified Google Explorer on AURA 🚀',
      followersCount: 120,
      followingCount: 45,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
  }

  return {
    success: true,
    user,
    token: 'aura_token_' + user.id,
  };
};
