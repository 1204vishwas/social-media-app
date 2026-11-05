export interface UserProfile {
  id: string;
  name: string;
  username: string;
  email: string;
  avatarUrl: string;
  provider: 'local' | 'google';
  bio?: string;
  followersCount: number;
  followingCount: number;
  isVerified?: boolean;
  createdAt: string;
}

export interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

export interface SignupFormData {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

export interface FormErrors {
  [key: string]: string | undefined;
}

export interface PasswordCriteria {
  label: string;
  passed: boolean;
}

export interface PasswordStrength {
  score: number; // 0 to 4
  label: 'Too Weak' | 'Weak' | 'Medium' | 'Strong' | 'Ultra Secure';
  color: string;
  barColor: string;
  criteria: PasswordCriteria[];
}

export type AuthMode = 'login' | 'signup' | 'forgot-password';

export interface ToastMessage {
  id: string;
  type: 'success' | 'error' | 'info';
  title: string;
  message: string;
  duration?: number;
}
