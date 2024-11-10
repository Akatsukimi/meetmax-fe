import { Visibility } from "./enum";

export type Conversation = {
  id: string;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: LastMessageSent;
};

export type User = {
  id: string;
  email: string;
  avatar?: string | null;
  username: string;
};

export type Message = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
};

export type LastMessageSent = {
  id: string;
  content: string;
  createdAt: Date;
};

export type MessageEventPayload = {
  message: Message;
  conversation: Conversation;
};

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type ConversationMessages = {
  conversationId: string;
  messages: Message[];
};

export interface Attachment {
  id: string;
  url: string;
}

export type LikeUser = {
  id: string;
  userId: string;
  username: string;
  updatedAt: string;
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  visibility: Visibility;
  author: User;
  files: Attachment[];
  likes: LikeUser[];
};
