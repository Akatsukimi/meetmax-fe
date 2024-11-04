export type ConversationType = {
  id: string;
  creator: User;
  recipient: User;
  createdAt: string;
  lastMessageSent: LastMessageSent;
};

export type CreateConversationParams = {
  email: string;
  message: string;
};

export type FetchMessagePayload = {
  id: string;
  messages: MessageType[];
};

export type CreateUserParams = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
};

export type UserCredentialsParams = {
  email: string;
  password: string;
};

export type User = {
  id: string;
  email: string;
  avatar?: string;
  username: string;
};

export type MessageType = {
  id: string;
  content: string;
  createdAt: string;
  author: User;
};

export type LastMessageSent = {
  content: string;
  createdAt: Date;
};

export type MessageEventPayload = {
  message: MessageType;
  conversation: ConversationType;
};

export type CreateMessageParams = {
  content: string;
  conversationId: number;
};

export type ConversationMessage = {
  id: string;
  messages: MessageType[];
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  visibility: string;
  author: User;
  image?: string;
};
