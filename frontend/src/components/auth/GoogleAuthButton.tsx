import React, { useState } from 'react';
import { Button } from '../common/Button';
import { useAuth } from '../../context/AuthContext';
import { UserProfile } from '../../types/auth';
import { Check, X } from 'lucide-react';

interface GoogleAuthButtonProps {
  label?: string;
  onSuccess?: () => void;
}

export const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  label = 'Continue with Google',
  onSuccess,
}) => {
  const { loginWithGoogle, isLoading } = useAuth();
  const [showSimulatedModal, setShowSimulatedModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Simulated Google accounts for instant demo/testing
  const demoGoogleAccounts: Partial<UserProfile>[] = [
    {
      name: 'Vishu Sharma',
      email: 'vishu.creator@gmail.com',
      username: 'vishu_tech',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    },
    {
      name: 'Maya Rodriguez',
      email: 'maya.rodriguez.ai@gmail.com',
      username: 'mayarodriguez',
      avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80',
    },
    {
      name: 'Kenji Sato',
      email: 'kenji.sato.dev@gmail.com',
      username: 'kenjisato',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
  ];

  const handleSelectAccount = async (account: Partial<UserProfile>) => {
    setIsProcessing(true);
    try {
      await loginWithGoogle(account);
      setShowSimulatedModal(false);
      onSuccess?.();
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInitialClick = () => {
    // Open Google Account chooser dialog
    setShowSimulatedModal(true);
  };

  return (
    <>
      <Button
        type="button"
        variant="google"
        size="md"
        fullWidth
        onClick={handleInitialClick}
        disabled={isLoading || isProcessing}
        leftIcon={
          <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
            />
          </svg>
        }
        className="font-medium text-slate-200 hover:text-white group border border-purple-500/20 hover:border-purple-400/50 py-3"
      >
        <span className="group-hover:text-purple-100 transition-colors">{label}</span>
      </Button>

      {/* Google OAuth Simulation Modal */}
      {showSimulatedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="w-full max-w-md rounded-2xl bg-[#121024] border border-purple-500/30 p-6 shadow-2xl text-left relative overflow-hidden">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-purple-500/10">
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-sm font-semibold text-white">Sign in with Google</span>
              </div>
              <button
                onClick={() => setShowSimulatedModal(false)}
                className="text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4">
              <h3 className="text-base font-bold text-white">Choose an account</h3>
              <p className="text-xs text-purple-200/70 mt-1">
                to continue to <span className="font-semibold text-purple-300">AURA Social</span>
              </p>

              {/* Account list */}
              <div className="mt-4 space-y-2">
                {demoGoogleAccounts.map((account) => (
                  <button
                    key={account.email}
                    onClick={() => handleSelectAccount(account)}
                    disabled={isProcessing}
                    className="w-full flex items-center gap-3.5 p-3 rounded-xl bg-void-900/80 hover:bg-purple-950/40 border border-purple-500/20 hover:border-purple-400/50 transition-all text-left group"
                  >
                    <img
                      src={account.avatarUrl}
                      alt={account.name}
                      className="w-10 h-10 rounded-full object-cover ring-1 ring-purple-500/40"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-white group-hover:text-purple-200 truncate">
                        {account.name}
                      </div>
                      <div className="text-xs text-zinc-400 truncate">{account.email}</div>
                    </div>
                    <Check className="w-4 h-4 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy note */}
            <div className="pt-3 border-t border-purple-500/10 text-[11px] text-zinc-400 leading-relaxed">
              To add your official Google Client ID for production, simply set{' '}
              <code className="text-purple-300 bg-purple-950/60 px-1 py-0.5 rounded">VITE_GOOGLE_CLIENT_ID</code> in{' '}
              <code className="text-purple-300 bg-purple-950/60 px-1 py-0.5 rounded">.env</code>.
            </div>
          </div>
        </div>
      )}
    </>
  );
};
