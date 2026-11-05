import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, LoginFormData, SignupFormData, ToastMessage } from '../types/auth';
import { authService } from '../services/authService';

interface AuthContextType {
  user: UserProfile | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (credentials: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  loginWithGoogle: (googleProfile?: Partial<UserProfile>) => Promise<void>;
  enterDemoMode: () => void;
  logout: () => void;
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    // Check initial session on boot
    const currentSession = authService.getCurrentSession();
    if (currentSession) {
      setUser(currentSession);
    } else {
      // Auto-initialize demo mode so user directly sees the full social network experience
      enterDemoMode();
    }
    setIsLoading(false);
  }, []);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, toast.duration || 4500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const enterDemoMode = () => {
    const demoUser: UserProfile = {
      id: 'usr_me',
      name: 'Vishu Sharma',
      username: 'vishu.aura',
      email: 'vishu@aura.social',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      provider: 'local',
      bio: 'Synthesizing realities between dark matter and neural interfaces. 🌌 Creator of the Dual Prism Protocol.',
      followersCount: 14820,
      followingCount: 421,
      isVerified: true,
      createdAt: '2026-01-15T00:00:00Z',
    };
    setUser(demoUser);
  };

  const login = async (credentials: LoginFormData) => {
    setIsLoading(true);
    try {
      const loggedUser = await authService.login(credentials);
      setUser(loggedUser);
      addToast({
        type: 'success',
        title: 'Welcome Back!',
        message: `Signed in as @${loggedUser.username}. Welcome back to AURA.`
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Authentication Failed',
        message: err.message || 'Unable to sign in. Please verify your credentials.'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormData) => {
    setIsLoading(true);
    try {
      const newUser = await authService.signup(data);
      setUser(newUser);
      addToast({
        type: 'success',
        title: 'Account Created!',
        message: `Welcome to AURA, ${newUser.name}! Your journey begins now.`
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Sign Up Failed',
        message: err.message || 'Unable to create account.'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithGoogle = async (googleProfile?: Partial<UserProfile>) => {
    setIsLoading(true);
    try {
      const gUser = await authService.loginWithGoogle(googleProfile);
      setUser(gUser);
      addToast({
        type: 'success',
        title: 'Google Connected',
        message: `Successfully authenticated via Google as ${gUser.name}.`
      });
    } catch (err: any) {
      addToast({
        type: 'error',
        title: 'Google Sign In Error',
        message: err.message || 'Could not authenticate with Google.'
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    addToast({
      type: 'info',
      title: 'Signed Out',
      message: 'You have been signed out safely. You can sign in anytime.'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        loginWithGoogle,
        enterDemoMode,
        logout,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
