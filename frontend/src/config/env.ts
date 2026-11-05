/**
 * Application environment configuration
 */
export const ENV_CONFIG = {
  APP_NAME: 'AURA',
  APP_TAGLINE: 'Connect Beyond Dimensions',
  // In production or when provided, uses VITE_GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_ID: import.meta.env.VITE_GOOGLE_CLIENT_ID || '1029384756-mock-google-client-id.apps.googleusercontent.com',
  IS_PRODUCTION: import.meta.env.PROD,
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
};
