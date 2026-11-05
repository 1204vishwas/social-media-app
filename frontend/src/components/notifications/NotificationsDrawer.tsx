import React from 'react';
import { X, Heart, MessageCircle, Layers, UserPlus, CheckCheck, Sparkles } from 'lucide-react';
import { useSocial } from '../../context/SocialContext';

export const NotificationsDrawer: React.FC = () => {
  const { isNotificationsOpen, toggleNotifications, notifications, markNotificationsRead } = useSocial();

  if (!isNotificationsOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-sm sm:max-w-md h-full bg-[#0a0818]/95 border-l border-purple-500/25 shadow-2xl flex flex-col text-left">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-purple-500/15 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-purple-600/30 text-purple-300">
              <Sparkles className="w-4 h-4 text-cyan-300" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Resonance Signals</h3>
              <p className="text-[11px] text-purple-300/70">Real-time interactions on your waves</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={markNotificationsRead}
              className="p-1.5 rounded-lg text-purple-400 hover:text-white hover:bg-white/5 transition-colors"
              title="Mark all as read"
            >
              <CheckCheck className="w-4 h-4" />
            </button>
            <button
              onClick={toggleNotifications}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar divide-y divide-purple-500/10">
          {notifications.map((notif) => {
            const isEchoShift = notif.type === 'echo_shift';
            const isLike = notif.type === 'like';
            const isComment = notif.type === 'comment';

            return (
              <div
                key={notif.id}
                className={`pt-3 flex items-start gap-3 transition-colors ${
                  !notif.read ? 'bg-purple-950/20 p-2.5 rounded-2xl' : ''
                }`}
              >
                {/* Sender Avatar & Type Icon Badge */}
                <div className="relative shrink-0">
                  <img
                    src={notif.sender.avatarUrl}
                    alt={notif.sender.name}
                    className="w-10 h-10 rounded-2xl object-cover ring-1 ring-purple-500/40"
                  />
                  <div
                    className={`absolute -bottom-1 -right-1 p-1 rounded-full text-white ${
                      isEchoShift
                        ? 'bg-cyan-500 shadow-glow-cyan'
                        : isLike
                        ? 'bg-rose-500'
                        : 'bg-purple-600'
                    }`}
                  >
                    {isEchoShift && <Layers className="w-2.5 h-2.5" />}
                    {isLike && <Heart className="w-2.5 h-2.5 fill-current" />}
                    {isComment && <MessageCircle className="w-2.5 h-2.5" />}
                    {notif.type === 'follow' && <UserPlus className="w-2.5 h-2.5" />}
                  </div>
                </div>

                <div className="flex-1 min-w-0 text-xs">
                  <p className="text-zinc-200 leading-relaxed">
                    <span className="font-bold text-white mr-1">@{notif.sender.username}</span>
                    {notif.message}
                  </p>
                  <span className="text-[10px] text-zinc-500 font-mono mt-1 block">
                    {notif.timestamp}
                  </span>
                </div>

                {notif.postSnippet && (
                  <img
                    src={notif.postSnippet}
                    alt="Post"
                    className="w-10 h-10 rounded-xl object-cover ring-1 ring-purple-500/20 shrink-0"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
