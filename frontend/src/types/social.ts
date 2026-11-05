import { UserProfile } from './auth';

export type VibeWavelength = 'cosmic' | 'voltage' | 'violet' | 'serenity' | 'all';

export interface CommentItem {
  id: string;
  author: UserProfile;
  text: string;
  timestamp: string;
  likes: number;
  isLiked?: boolean;
  voiceNoteUrl?: string;
  timestampAnchor?: number; // specific second in audio echo
}

export interface DualPrismContent {
  // Layer 1: Curated Reality
  canvasImage: string;
  caption: string;
  
  // Layer 2: Raw Echo Reality (The Unique Innovation)
  echoImage: string;
  echoCaption: string;
  rawThoughtLog?: string;
  acousticEcho?: {
    title: string;
    artist: string;
    duration: number; // in seconds
    frequencyWave: number[]; // relative waveform heights [20, 60, 90, 45...]
  };
  
  vibeFrequency: 'cosmic' | 'voltage' | 'violet' | 'serenity';
  tags: string[];
  location?: string;
}

export interface Post {
  id: string;
  author: UserProfile;
  content: DualPrismContent;
  metrics: {
    likes: number;
    echoShifts: number; // count of users who peeled the reality layer
    commentsCount: number;
    shares: number;
    views: number;
  };
  isLiked: boolean;
  isSaved: boolean;
  comments: CommentItem[];
  createdAt: string;
}

export interface Story {
  id: string;
  author: UserProfile;
  mediaUrl: string;
  caption?: string;
  musicTitle?: string;
  vibe: VibeWavelength;
  hasUnseen: boolean;
  createdAt: string;
}

export interface Reel {
  id: string;
  author: UserProfile;
  videoUrl: string; // animated visual loop / video stream
  posterUrl: string;
  caption: string;
  audioTrack: {
    title: string;
    artist: string;
    albumArt?: string;
  };
  metrics: {
    likes: number;
    comments: number;
    shares: number;
    echoShifts: number;
  };
  isLiked: boolean;
  isSaved: boolean;
  vibe: VibeWavelength;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text?: string;
  imageUrl?: string;
  voiceMemo?: {
    duration: number;
    wave: number[];
  };
  timestamp: string;
  isRead: boolean;
  reaction?: string;
}

export interface Conversation {
  id: string;
  participant: UserProfile;
  lastMessage: string;
  lastTimestamp: string;
  unreadCount: number;
  isOnline: boolean;
  messages: ChatMessage[];
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'echo_shift' | 'follow' | 'resonance';
  sender: UserProfile;
  message: string;
  postSnippet?: string;
  timestamp: string;
  read: boolean;
}

export type MainNavTab = 'feed' | 'reels' | 'explore' | 'messages' | 'profile';
