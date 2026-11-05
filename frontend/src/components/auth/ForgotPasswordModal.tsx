import React, { useState } from 'react';
import { X, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { authService } from '../../services/authService';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultEmail?: string;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({
  isOpen,
  onClose,
  defaultEmail = '',
}) => {
  const [email, setEmail] = useState(defaultEmail);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
      await authService.requestPasswordReset(email.trim());
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Failed to send reset link');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-md rounded-2xl bg-[#0f0d22] border border-purple-500/30 p-6 shadow-2xl relative text-left">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          <div className="text-center py-4 space-y-4">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 border border-purple-400/40 text-purple-300 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Reset Link Dispatched</h3>
            <p className="text-xs text-purple-200/70 max-w-xs mx-auto leading-relaxed">
              We’ve sent secure password reset instructions to{' '}
              <span className="font-semibold text-white">{email}</span>. Please inspect your inbox.
            </p>
            <div className="pt-2">
              <Button variant="primary" fullWidth onClick={handleClose}>
                Return to Sign In
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <h3 className="text-lg font-bold text-white">Recover Your Account</h3>
              <p className="text-xs text-purple-200/70 mt-1">
                Enter your account email to receive an instant encrypted recovery link.
              </p>
            </div>

            <Input
              label="Account Email"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (error) setError(null);
              }}
              placeholder="alex@example.com"
              leftIcon={<Mail className="w-4 h-4" />}
              error={error || undefined}
              autoFocus
            />

            <div className="flex items-center gap-3 pt-2">
              <Button
                type="button"
                variant="ghost"
                fullWidth
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                fullWidth
                isLoading={isLoading}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Send Link
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
