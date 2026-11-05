import React, { createContext, useContext, useState, ReactNode } from 'react';
import {
  Post,
  Story,
  Reel,
  Conversation,
  NotificationItem,
  MainNavTab,
  VibeWavelength,
  DualPrismContent,
  CommentItem
} from '../types/social';
import {
  CURRENT_USER,
  INITIAL_POSTS,
  INITIAL_STORIES,
  INITIAL_REELS,
  INITIAL_CONVERSATIONS,
  INITIAL_NOTIFICATIONS
} from '../services/mockSocialData';
import { soundEngine } from '../utils/soundEngine';

interface SocialContextType {
  currentUser: typeof CURRENT_USER;
  posts: Post[];
  stories: Story[];
  reels: Reel[];
  conversations: Conversation[];
  notifications: NotificationItem[];
  activeTab: MainNavTab;
  activeWavelength: VibeWavelength;
  activeStory: Story | null;
  isCreateModalOpen: boolean;
  isNotificationsOpen: boolean;
  unreadMessagesCount: number;
  unreadNotificationsCount: number;
  
  // Navigation & Filtering
  setActiveTab: (tab: MainNavTab) => void;
  setWavelength: (vibe: VibeWavelength) => void;
  
  // Post Interactions
  toggleLikePost: (postId: string) => void;
  toggleSavePost: (postId: string) => void;
  recordEchoShift: (postId: string) => void;
  addComment: (postId: string, text: string) => void;
  createPost: (content: DualPrismContent) => void;
  
  // Reel Interactions
  toggleLikeReel: (reelId: string) => void;
  toggleSaveReel: (reelId: string) => void;
  
  // Stories & Modals
  openStory: (story: Story) => void;
  closeStory: () => void;
  openCreateModal: () => void;
  closeCreateModal: () => void;
  toggleNotifications: () => void;
  markNotificationsRead: () => void;
  
  // Direct Messaging
  sendMessage: (conversationId: string, text: string) => void;
}

const SocialContext = createContext<SocialContextType | undefined>(undefined);

export const SocialProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(CURRENT_USER);
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS);
  const [stories, setStories] = useState<Story[]>(INITIAL_STORIES);
  const [reels, setReels] = useState<Reel[]>(INITIAL_REELS);
  const [conversations, setConversations] = useState<Conversation[]>(INITIAL_CONVERSATIONS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  
  const [activeTab, setActiveTabState] = useState<MainNavTab>('feed');
  const [activeWavelength, setActiveWavelengthState] = useState<VibeWavelength>('all');
  const [activeStory, setActiveStory] = useState<Story | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const unreadMessagesCount = conversations.reduce((acc, c) => acc + c.unreadCount, 0);
  const unreadNotificationsCount = notifications.filter((n) => !n.read).length;

  const setActiveTab = (tab: MainNavTab) => {
    soundEngine.playClick();
    setActiveTabState(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const setWavelength = (vibe: VibeWavelength) => {
    soundEngine.playWavelength(vibe);
    setActiveWavelengthState(vibe);
  };

  const toggleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== postId) return p;
        const willLike = !p.isLiked;
        if (willLike) soundEngine.playChime(659.25);
        return {
          ...p,
          isLiked: willLike,
          metrics: {
            ...p.metrics,
            likes: willLike ? p.metrics.likes + 1 : p.metrics.likes - 1,
          },
        };
      })
    );
  };

  const toggleSavePost = (postId: string) => {
    soundEngine.playClick();
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const recordEchoShift = (postId: string) => {
    soundEngine.playEchoShift();
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              metrics: {
                ...p.metrics,
                echoShifts: p.metrics.echoShifts + 1,
              },
            }
          : p
      )
    );
  };

  const addComment = (postId: string, text: string) => {
    if (!text.trim()) return;
    soundEngine.playClick();

    const newComment: CommentItem = {
      id: 'c_' + Date.now(),
      author: currentUser,
      text: text.trim(),
      timestamp: 'Just now',
      likes: 0,
    };

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [newComment, ...p.comments],
              metrics: {
                ...p.metrics,
                commentsCount: p.metrics.commentsCount + 1,
              },
            }
          : p
      )
    );
  };

  const createPost = (content: DualPrismContent) => {
    soundEngine.playChime(784);
    const newPost: Post = {
      id: 'post_' + Date.now(),
      author: currentUser,
      content,
      metrics: {
        likes: 0,
        echoShifts: 0,
        commentsCount: 0,
        shares: 0,
        views: 1,
      },
      isLiked: false,
      isSaved: false,
      comments: [],
      createdAt: 'Just now',
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsCreateModalOpen(false);
    setActiveTab('feed');
  };

  const toggleLikeReel = (reelId: string) => {
    setReels((prev) =>
      prev.map((r) => {
        if (r.id !== reelId) return r;
        const willLike = !r.isLiked;
        if (willLike) soundEngine.playChime(700);
        return {
          ...r,
          isLiked: willLike,
          metrics: {
            ...r.metrics,
            likes: willLike ? r.metrics.likes + 1 : r.metrics.likes - 1,
          },
        };
      })
    );
  };

  const toggleSaveReel = (reelId: string) => {
    soundEngine.playClick();
    setReels((prev) =>
      prev.map((r) => (r.id === reelId ? { ...r, isSaved: !r.isSaved } : r))
    );
  };

  const openStory = (story: Story) => {
    soundEngine.playClick();
    setActiveStory(story);
    // Mark as seen
    setStories((prev) =>
      prev.map((s) => (s.id === story.id ? { ...s, hasUnseen: false } : s))
    );
  };

  const closeStory = () => {
    setActiveStory(null);
  };

  const openCreateModal = () => {
    soundEngine.playClick();
    setIsCreateModalOpen(true);
  };

  const closeCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const toggleNotifications = () => {
    soundEngine.playClick();
    setIsNotificationsOpen((prev) => !prev);
  };

  const markNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const sendMessage = (conversationId: string, text: string) => {
    if (!text.trim()) return;
    soundEngine.playClick();

    const newMsg = {
      id: 'm_' + Date.now(),
      senderId: currentUser.id,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== conversationId) return c;
        return {
          ...c,
          lastMessage: text.trim(),
          lastTimestamp: 'Just now',
          messages: [...c.messages, newMsg],
        };
      })
    );

    // Simulate smart interactive reply after 1.8s
    setTimeout(() => {
      soundEngine.playChime(520);
      const responses = [
        'Resonating with your frequency! Let’s explore this dimension.',
        'Checked your latest Dual Prism post—the raw acoustic memo was insane!',
        'Got it! Synchronizing with the room now. 🔮',
        'That frequency harmony sounds perfect for Friday night.',
      ];
      const botMsg = {
        id: 'm_bot_' + Date.now(),
        senderId: conversationId.replace('conv_', 'usr_'),
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isRead: false,
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id !== conversationId) return c;
          return {
            ...c,
            lastMessage: botMsg.text,
            lastTimestamp: 'Just now',
            unreadCount: c.unreadCount + 1,
            messages: [...c.messages, botMsg],
          };
        })
      );
    }, 1800);
  };

  return (
    <SocialContext.Provider
      value={{
        currentUser,
        posts,
        stories,
        reels,
        conversations,
        notifications,
        activeTab,
        activeWavelength,
        activeStory,
        isCreateModalOpen,
        isNotificationsOpen,
        unreadMessagesCount,
        unreadNotificationsCount,
        setActiveTab,
        setWavelength,
        toggleLikePost,
        toggleSavePost,
        recordEchoShift,
        addComment,
        createPost,
        toggleLikeReel,
        toggleSaveReel,
        openStory,
        closeStory,
        openCreateModal,
        closeCreateModal,
        toggleNotifications,
        markNotificationsRead,
        sendMessage,
      }}
    >
      {children}
    </SocialContext.Provider>
  );
};

export const useSocial = () => {
  const context = useContext(SocialContext);
  if (!context) {
    throw new Error('useSocial must be used within a SocialProvider');
  }
  return context;
};
