import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { GoogleAuthButton } from './GoogleAuthButton';
import { ForgotPasswordModal } from './ForgotPasswordModal';
import { useAuth } from '../../context/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { LoginFormData } from '../../types/auth';

interface LoginFormProps {
  onSwitchToSignup: () => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToSignup }) => {
  const { login, enterDemoMode, isLoading } = useAuth();
  const { errors, validateLogin, clearError } = useFormValidation();

  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: '',
    rememberMe: true,
  });

  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin(formData)) {
      return;
    }

    try {
      await login(formData);
    } catch {
      // Handled via toast in AuthContext
    }
  };

  const handleQuickDemoFill = () => {
    setFormData({
      email: 'alex.creator@aura.social',
      password: 'AuraPass2026!#',
      rememberMe: true,
    });
    clearError('email');
    clearError('password');
  };

  return (
    <div className="w-full space-y-5 text-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Welcome <span className="purple-gradient-text">Back</span>
        </h2>
        <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
          Enter your credentials to access your realm and live channels.
        </p>
      </div>

      {/* Explore Live Network Direct Button */}
      <button
        type="button"
        onClick={enterDemoMode}
        className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-purple-700/80 via-fuchsia-600/80 to-cyan-600/80 hover:brightness-115 text-white font-bold text-xs border border-purple-400/50 shadow-lg shadow-purple-950/60 transition-all hover:scale-[1.01] active:scale-[0.99]"
      >
        <Sparkles className="w-4 h-4 text-cyan-300 animate-spin" />
        <span>⚡ Enter Live Network Directly (Full App Preview)</span>
      </button>

      {/* Social Google Login Button */}
      <div className="space-y-3">
        <GoogleAuthButton label="Sign In with Google" />

        {/* Divider with subtle glowing line */}
        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-purple-500/20 w-full" />
          <span className="bg-[#120e24] px-3 text-[11px] font-semibold text-purple-300/60 uppercase tracking-widest absolute">
            or sign in with email
          </span>
        </div>
      </div>

      {/* Main Login Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="name@example.com"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            clearError('email');
          }}
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email}
          autoComplete="email"
        />

        <div className="space-y-1">
          <Input
            label="Password"
            isPassword
            name="password"
            placeholder="••••••••••••"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              clearError('password');
            }}
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password}
            autoComplete="current-password"
          />

          <div className="flex items-center justify-between pt-1">
            <Checkbox
              label="Remember this device"
              checked={formData.rememberMe}
              onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
            />

            <button
              type="button"
              onClick={() => setIsForgotModalOpen(true)}
              className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors focus:outline-none"
            >
              Forgot password?
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-1 space-y-2.5">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Sign In to AURA
          </Button>

          {/* Quick Demo Fill Pill */}
          <button
            type="button"
            onClick={handleQuickDemoFill}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs text-purple-300/80 hover:text-white rounded-lg bg-purple-950/20 hover:bg-purple-900/30 border border-purple-500/20 transition-all"
          >
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            <span>Fill Demo Credentials</span>
          </button>
        </div>
      </form>

      {/* Switch to Sign Up */}
      <div className="text-center pt-2 border-t border-purple-500/10">
        <p className="text-xs text-zinc-400">
          New to the network?{' '}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
          >
            Create an account
          </button>
        </p>
      </div>

      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={isForgotModalOpen}
        onClose={() => setIsForgotModalOpen(false)}
        defaultEmail={formData.email}
      />
    </div>
  );
};
