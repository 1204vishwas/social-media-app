import React, { useState } from 'react';
import { User, AtSign, Mail, Lock, ShieldCheck, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { Checkbox } from '../common/Checkbox';
import { GoogleAuthButton } from './GoogleAuthButton';
import { PasswordStrengthMeter } from './PasswordStrengthMeter';
import { useAuth } from '../../context/AuthContext';
import { useFormValidation } from '../../hooks/useFormValidation';
import { usePasswordStrength } from '../../hooks/usePasswordStrength';
import { SignupFormData } from '../../types/auth';

interface SignupFormProps {
  onSwitchToLogin: () => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSwitchToLogin }) => {
  const { signup, isLoading } = useAuth();
  const { errors, validateSignup, clearError } = useFormValidation();

  const [formData, setFormData] = useState<SignupFormData>({
    fullName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false,
  });

  const passwordStrength = usePasswordStrength(formData.password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateSignup(formData)) {
      return;
    }

    try {
      await signup(formData);
      // Trigger festive celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#a855f7', '#c084fc', '#38bdf8', '#ffffff'],
      });
    } catch {
      // Handled via toast in AuthContext
    }
  };

  return (
    <div className="w-full space-y-5 text-left">
      {/* Header */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Join <span className="purple-gradient-text">AURA</span>
        </h2>
        <p className="text-xs sm:text-sm text-purple-200/70 mt-1">
          Claim your digital handle and build your sovereign circle.
        </p>
      </div>

      {/* Social Google Signup Button */}
      <div className="space-y-3">
        <GoogleAuthButton
          label="Sign Up with Google"
          onSuccess={() => {
            confetti({
              particleCount: 70,
              spread: 60,
              origin: { y: 0.6 },
              colors: ['#a855f7', '#38bdf8'],
            });
          }}
        />

        {/* Divider with subtle glowing line */}
        <div className="relative flex items-center justify-center my-3">
          <div className="border-t border-purple-500/20 w-full" />
          <span className="bg-[#120e24] px-3 text-[11px] font-semibold text-purple-300/60 uppercase tracking-widest absolute">
            or register with email
          </span>
        </div>
      </div>

      {/* Signup Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Input
            label="Full Name"
            name="fullName"
            placeholder="Nova Rivera"
            value={formData.fullName}
            onChange={(e) => {
              setFormData({ ...formData, fullName: e.target.value });
              clearError('fullName');
            }}
            leftIcon={<User className="w-4 h-4" />}
            error={errors.fullName}
          />

          <Input
            label="Username Handle"
            name="username"
            placeholder="novarivera"
            value={formData.username}
            onChange={(e) => {
              setFormData({ ...formData, username: e.target.value });
              clearError('username');
            }}
            leftIcon={<AtSign className="w-4 h-4" />}
            error={errors.username}
          />
        </div>

        <Input
          label="Email Address"
          type="email"
          name="email"
          placeholder="nova@cosmos.io"
          value={formData.email}
          onChange={(e) => {
            setFormData({ ...formData, email: e.target.value });
            clearError('email');
          }}
          leftIcon={<Mail className="w-4 h-4" />}
          error={errors.email}
        />

        <div className="space-y-1.5">
          <Input
            label="Create Password"
            isPassword
            name="password"
            placeholder="Min. 8 characters"
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
              clearError('password');
            }}
            leftIcon={<Lock className="w-4 h-4" />}
            error={errors.password}
          />

          {formData.password.length > 0 && (
            <PasswordStrengthMeter strength={passwordStrength} />
          )}
        </div>

        <Input
          label="Confirm Password"
          isPassword
          name="confirmPassword"
          placeholder="Re-enter password"
          value={formData.confirmPassword}
          onChange={(e) => {
            setFormData({ ...formData, confirmPassword: e.target.value });
            clearError('confirmPassword');
          }}
          leftIcon={<ShieldCheck className="w-4 h-4" />}
          error={errors.confirmPassword}
        />

        {/* Terms of service agreement */}
        <div className="pt-1">
          <Checkbox
            label={
              <span>
                I agree to the{' '}
                <a href="#terms" className="text-purple-400 hover:underline">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#privacy" className="text-purple-400 hover:underline">
                  Privacy Policy
                </a>
              </span>
            }
            checked={formData.agreeToTerms}
            onChange={(e) => {
              setFormData({ ...formData, agreeToTerms: e.target.checked });
              clearError('agreeToTerms');
            }}
            error={errors.agreeToTerms}
          />
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <Button
            type="submit"
            variant="primary"
            size="md"
            fullWidth
            isLoading={isLoading}
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            Create My Account
          </Button>
        </div>
      </form>

      {/* Switch to Login */}
      <div className="text-center pt-2 border-t border-purple-500/10">
        <p className="text-xs text-zinc-400">
          Already a member?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-purple-400 hover:text-purple-300 underline underline-offset-4 transition-colors"
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
};
