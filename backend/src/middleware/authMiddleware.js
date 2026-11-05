import { db } from '../config/db.js';

export const protect = (req, res, next) => {
  const authHeader = req.headers?.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    const token = authHeader.split(' ')[1];
    // In demo / JWT mode, extract user
    const foundUser = db.users.find((u) => token.includes(u.id)) || db.users[0];
    req.user = foundUser;
    return next();
  }

  // Fallback to active session user
  req.user = db.users[0];
  next();
};
