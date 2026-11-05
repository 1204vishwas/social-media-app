import React from 'react';
import { LogOut, Sparkles, CheckCircle2, Users, Radio, Compass, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../common/Button';

export const UserProfileCard: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="w-full max-w-lg mx-auto glass-panel rounded-3xl p-8 border border-purple-500/30 shadow-2xl relative text-left">
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Top action icons */}
      <div className="flex items-center justify-between pb-6 border-b border-purple-500/15">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">
            Active Session
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-xl bg-void-800/80 hover:bg-purple-950/40 text-purple-300 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            leftIcon={<LogOut className="w-3.5 h-3.5" />}
            className="text-xs text-rose-300 hover:text-rose-200 hover:bg-rose-950/30"
          >
            Sign Out
          </Button>
        </div>
      </div>

      {/* User Header */}
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 pt-6">
        <div className="relative">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-2xl object-cover ring-2 ring-purple-500 shadow-lg shadow-purple-950/50"
          />
          <div className="absolute -bottom-1 -right-1 p-1 bg-void-900 rounded-full">
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 flex items-center justify-center text-[10px] text-white">
              <Sparkles className="w-2.5 h-2.5" />
            </div>
          </div>
        </div>

        <div className="text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-xl font-bold text-white tracking-tight">{user.name}</h2>
            {user.isVerified && (
              <CheckCircle2 className="w-4 h-4 text-cyan-400 fill-cyan-400/20" />
            )}
          </div>
          <p className="text-xs text-purple-400 font-mono mt-0.5">@{user.username}</p>
          <p className="text-xs text-zinc-300 mt-2 leading-relaxed">{user.bio}</p>
        </div>
      </div>

      {/* Social stats */}
      <div className="grid grid-cols-3 gap-3 my-6 p-4 rounded-2xl bg-void-900/80 border border-purple-500/15 text-center">
        <div>
          <div className="text-base font-extrabold text-white">
            {user.followersCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-purple-300/60 uppercase tracking-wider mt-0.5">
            Followers
          </div>
        </div>
        <div className="border-x border-purple-500/15">
          <div className="text-base font-extrabold text-white">
            {user.followingCount.toLocaleString()}
          </div>
          <div className="text-[11px] text-purple-300/60 uppercase tracking-wider mt-0.5">
            Following
          </div>
        </div>
        <div>
          <div className="text-base font-extrabold text-white capitalize">{user.provider}</div>
          <div className="text-[11px] text-purple-300/60 uppercase tracking-wider mt-0.5">
            Provider
          </div>
        </div>
      </div>

      {/* Quick Navigation simulation */}
      <div className="space-y-2.5 pt-2">
        <Button
          variant="primary"
          fullWidth
          leftIcon={<Compass className="w-4 h-4" />}
          onClick={() => alert('Social Feed component is ready for Phase 2 expansion!')}
        >
          Enter Spatial Timeline
        </Button>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Radio className="w-3.5 h-3.5 text-cyan-400" />}
            onClick={() => alert('Audio Spheres live rooms ready!')}
          >
            Audio Sphere
          </Button>
          <Button
            variant="secondary"
            size="sm"
            leftIcon={<Users className="w-3.5 h-3.5 text-purple-400" />}
            onClick={() => alert('Community Circles ready!')}
          >
            Find Circles
          </Button>
        </div>
      </div>
    </div>
  );
};
