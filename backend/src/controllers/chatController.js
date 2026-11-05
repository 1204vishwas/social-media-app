import { db } from '../config/db.js';

export const getConversations = () => {
  return {
    success: true,
    conversations: db.conversations.map((c) => {
      const otherUserId = c.participants.find((id) => id !== 'usr_me') || c.participants[0];
      const participant = db.users.find((u) => u.id === otherUserId) || db.users[1];
      const messages = db.messages.filter((m) => m.conversationId === c.id);

      return {
        id: c.id,
        participant,
        lastMessage: c.lastMessage,
        lastTimestamp: c.lastTimestamp,
        unreadCount: 0,
        isOnline: true,
        messages,
      };
    }),
  };
};

export const sendMessage = (body, user) => {
  const author = user || db.users[0];
  const { conversationId, text, voiceMemo } = body;

  const newMsg = {
    id: 'm_' + Date.now(),
    conversationId: conversationId || 'conv_1',
    senderId: author.id,
    text,
    voiceMemo,
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    isRead: true,
  };

  db.messages.push(newMsg);

  const conv = db.conversations.find((c) => c.id === conversationId);
  if (conv) {
    conv.lastMessage = text || 'Sent a voice memo';
    conv.lastTimestamp = 'Just now';
  }

  return {
    success: true,
    message: newMsg,
  };
};
