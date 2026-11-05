import { UserProfile } from '../types/auth';

/**
 * Decodes standard Google JWT Credential Response
 */
export function decodeGoogleJwt(token: string): Partial<UserProfile> | null {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const parsed = JSON.parse(jsonPayload);

    return {
      name: parsed.name || parsed.given_name || 'Google User',
      email: parsed.email || '',
      username: (parsed.email?.split('@')[0] || 'aura_user').toLowerCase().replace(/[^a-z0-9_]/g, ''),
      avatarUrl: parsed.picture || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150',
    };
  } catch (error) {
    console.error('Error decoding Google JWT token', error);
    return null;
  }
}
