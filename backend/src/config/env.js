export const ENV = {
  PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 5000,
  NODE_ENV: process.env.NODE_ENV || 'development',
  CLIENT_URL: process.env.CLIENT_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || 'aura_default_jwt_secret_key_2026',
  DATABASE_URL: process.env.DATABASE_URL || 'mongodb://localhost:27017/aura_social',
};
