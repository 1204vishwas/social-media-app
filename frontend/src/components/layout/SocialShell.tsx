import React from 'react';
import { TopBar } from '../navigation/TopBar';
import { FloatingDock } from '../navigation/FloatingDock';
import { FeedView } from '../feed/FeedView';
import { ReelsStream } from '../reels/ReelsStream';
import { ExploreGrid } from '../explore/ExploreGrid';
import { DirectMessagesView } from '../messages/DirectMessagesView';
import { ProfileView } from '../profile/ProfileView';
import { StoryViewerModal } from '../stories/StoryViewerModal';
import { CreatePostModal } from '../create/CreatePostModal';
import { NotificationsDrawer } from '../notifications/NotificationsDrawer';
import { AmbientGlow } from './AmbientGlow';
import { useSocial } from '../../context/SocialContext';

export const SocialShell: React.FC = () => {
  const { activeTab } = useSocial();

  return (
    <div className="min-h-screen w-full bg-[#040308] text-slate-100 relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Ambient Lights */}
      <AmbientGlow />

      {/* Sticky Header TopBar */}
      <TopBar />

      {/* Main Dynamic Viewport */}
      <main className="relative z-10 flex-1 w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-5">
        {activeTab === 'feed' && <FeedView />}
        {activeTab === 'reels' && <ReelsStream />}
        {activeTab === 'explore' && <ExploreGrid />}
        {activeTab === 'messages' && <DirectMessagesView />}
        {activeTab === 'profile' && <ProfileView />}
      </main>

      {/* Floating Holographic Bottom Dock */}
      <FloatingDock />

      {/* Modals & Slide-Over Drawers */}
      <StoryViewerModal />
      <CreatePostModal />
      <NotificationsDrawer />
    </div>
  );
};
