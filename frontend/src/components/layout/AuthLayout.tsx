import React, { ReactNode } from 'react';
import { AmbientGlow } from './AmbientGlow';
import { BrandHero } from './BrandHero';
import { Sparkles, Globe, Shield } from 'lucide-react';

interface AuthLayoutProps {
  children: ReactNode;
  activeMode: 'login' | 'signup';
  onModeChange: (mode: 'login' | 'signup') => void;
  isAuthenticated: boolean;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  children,
  activeMode,
  onModeChange,
  isAuthenticated,
}) => {
  return (
    <div className="min-h-screen w-full bg-[#05040a] relative flex flex-col justify-between overflow-x-hidden">
      {/* Dynamic Ambient Background */}
      <AmbientGlow />

      {/* Top Navbar / Branding Bar */}
      <header className="relative z-20 w-full px-6 py-5 lg:px-12 flex items-center justify-between border-b border-purple-500/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-0.5 shadow-lg shadow-purple-900/40 flex items-center justify-center">
            <div className="w-full h-full bg-[#0d0a1e] rounded-[14px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-wider text-white font-mono">
              AURA<span className="text-purple-400">.</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase tracking-widest text-purple-300/60 font-semibold px-2 py-0.5 rounded-full bg-purple-950/40 border border-purple-500/20">
              Social Network
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 text-xs text-purple-200/70">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-void-800/60 border border-purple-500/20 text-purple-300">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Global Node 01</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-void-800/60 border border-purple-500/20 text-purple-300">
            <Shield className="w-3.5 h-3.5 text-purple-400" />
            <span>v2.4 TLS Protected</span>
          </div>
        </div>
      </header>

      {/* Main Responsive Grid */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Brand Hero Showcase (Desktop only) */}
          <div className="hidden lg:block lg:col-span-6 xl:col-span-7">
            <BrandHero />
          </div>

          {/* Right Side: Auth Card Container */}
          <div className="w-full lg:col-span-6 xl:col-span-5 max-w-md mx-auto">
            {/* Authenticated Mode vs Guest Auth Form */}
            {isAuthenticated ? (
              children
            ) : (
              <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/25 shadow-2xl relative">
                {/* Glow ring top highlight */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent rounded-full shadow-[0_0_15px_#a855f7]" />

                {/* Tab Switcher */}
                <div className="flex items-center p-1.5 rounded-2xl bg-void-950/80 border border-purple-500/20 mb-6">
                  <button
                    type="button"
                    onClick={() => onModeChange('login')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                      activeMode === 'login'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-950/50'
                        : 'text-zinc-400 hover:text-purple-200'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => onModeChange('signup')}
                    className={`flex-1 py-2 text-xs sm:text-sm font-semibold rounded-xl transition-all duration-200 ${
                      activeMode === 'signup'
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-md shadow-purple-950/50'
                        : 'text-zinc-400 hover:text-purple-200'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Form Body */}
                {children}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full px-6 py-4 border-t border-purple-500/10 backdrop-blur-sm text-center text-xs text-zinc-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-zinc-400">
            © {new Date().getFullYear()} AURA Technologies Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-purple-300/70">
            <a href="#privacy" className="hover:text-purple-200 transition-colors">
              Privacy Protocol
            </a>
            <a href="#terms" className="hover:text-purple-200 transition-colors">
              Terms
            </a>
            <a href="#security" className="hover:text-purple-200 transition-colors">
              Zero-Trust Security
            </a>
            <a href="#status" className="hover:text-cyan-300 transition-colors">
              Network Status: 99.99%
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
