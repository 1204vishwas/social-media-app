import { UserProfile, LoginFormData, SignupFormData } from '../types/auth';

const STORAGE_KEY_USER = 'aura_auth_user';
const STORAGE_KEY_USERS_DB = 'aura_registered_users';

/**
 * Service handling user authentication with simulated persistence and OAuth integration
 */
export const authService = {
  /**
   * Retrieves active user session from localStorage/sessionStorage
   */
  getCurrentSession(): UserProfile | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_USER) || sessionStorage.getItem(STORAGE_KEY_USER);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse current session', e);
    }
    return null;
  },

  /**
   * Mock API Login with Email & Password
   */
  async login(credentials: LoginFormData): Promise<UserProfile> {
    // Simulate real network latency (600ms)
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Basic email check
    const normalizedEmail = credentials.email.toLowerCase().trim();

    // Check if registered locally
    const storedUsers: Record<string, { password: string; profile: UserProfile }> = 
      JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '{}');

    if (storedUsers[normalizedEmail]) {
      const record = storedUsers[normalizedEmail];
      if (record.password !== credentials.password) {
        throw new Error('Invalid email or password combination.');
      }
      this.persistSession(record.profile, credentials.rememberMe);
      return record.profile;
    }

    // Default demo account acceptance or realistic check
    if (normalizedEmail.includes('@') && credentials.password.length >= 6) {
      const demoUser: UserProfile = {
        id: 'usr_' + Math.random().toString(36).substring(2, 9),
        name: normalizedEmail.split('@')[0].replace(/[._-]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        username: normalizedEmail.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, ''),
        email: normalizedEmail,
        avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
        provider: 'local',
        bio: 'Explorer of digital realms & decentralized vibes 🌌',
        followersCount: 1240,
        followingCount: 382,
        isVerified: true,
        createdAt: new Date().toISOString(),
      };

      this.persistSession(demoUser, credentials.rememberMe);
      return demoUser;
    }

    throw new Error('Invalid credentials. Password must be at least 6 characters.');
  },

  /**
   * Mock API Signup
   */
  async signup(data: SignupFormData): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 750));

    const normalizedEmail = data.email.toLowerCase().trim();
    const storedUsers = JSON.parse(localStorage.getItem(STORAGE_KEY_USERS_DB) || '{}');

    if (storedUsers[normalizedEmail]) {
      throw new Error('An account with this email address already exists.');
    }

    const newUser: UserProfile = {
      id: 'usr_' + Math.random().toString(36).substring(2, 9),
      name: data.fullName.trim(),
      username: data.username.toLowerCase().trim().replace(/[^a-z0-9_]/g, ''),
      email: normalizedEmail,
      avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80`,
      provider: 'local',
      bio: 'Just arrived at AURA! Ready to connect. ✨',
      followersCount: 1,
      followingCount: 5,
      isVerified: false,
      createdAt: new Date().toISOString(),
    };

    // Save to local registry
    storedUsers[normalizedEmail] = {
      password: data.password,
      profile: newUser,
    };
    localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(storedUsers));

    // Save active session
    this.persistSession(newUser, true);
    return newUser;
  },

  /**
   * Google OAuth login handler
   */
  async loginWithGoogle(googleUserData?: Partial<UserProfile>): Promise<UserProfile> {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const googleUser: UserProfile = {
      id: 'goog_' + Math.random().toString(36).substring(2, 9),
      name: googleUserData?.name || 'Alex Chen',
      username: googleUserData?.username || 'alex_aura',
      email: googleUserData?.email || 'alex.chen@gmail.com',
      avatarUrl: googleUserData?.avatarUrl || 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
      provider: 'google',
      bio: 'Google Verified Creator & Digital Architect 🚀',
      followersCount: 3890,
      followingCount: 512,
      isVerified: true,
      createdAt: new Date().toISOString(),
    };

    this.persistSession(googleUser, true);
    return googleUser;
  },

  /**
   * Password reset request simulation
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    await new Promise((resolve) => setTimeout(resolve, 600));
    if (!email || !email.includes('@')) {
      throw new Error('Please enter a valid email address.');
    }
    return true;
  },

  /**
   * Session storage helper
   */
  persistSession(user: UserProfile, remember: boolean) {
    const serialized = JSON.stringify(user);
    if (remember) {
      localStorage.setItem(STORAGE_KEY_USER, serialized);
    } else {
      sessionStorage.setItem(STORAGE_KEY_USER, serialized);
    }
  },

  /**
   * Logout and clear sessions
   */
  logout() {
    localStorage.removeItem(STORAGE_KEY_USER);
    sessionStorage.removeItem(STORAGE_KEY_USER);
  }
};
