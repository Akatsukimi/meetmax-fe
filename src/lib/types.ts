import { Visibility } from "./enum";

export type ErrorServerResponse = {
  response: {
    data: {
      error: string;
      message: string[];
      statusCode: number;
    };
  };
};

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

export type CreateGroupParams = {
  users: string[];
  title: string;
};

export type ConversationMessages = {
  conversationId: string;
  messages: Message[];
};

export interface Attachment {
  id: string;
  url: string;
  mimetype: string;
}

export type BaseLikedPostUser = Pick<User, "username">;

export type LikedPostUser = BaseLikedPostUser & {
  userId: string;
  avatar: string | null;
};

export type Pagination<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type Post = {
  id: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  visibility: Visibility;
  author: User;
  attachments: Attachment[];
  likes: LikedPostUser[];
  remainingLikeCount: number;
  isLikedByCurrentUser: boolean;
  commentCount: number;
};

export type Comment = {
  id: string;
  postId: string;
  content: string;
  user: {
    id: string;
    username: string;
    avatar: string | null;
  };
  parentCommentId: string | null;
  updatedAt: string;
};

export type Group = {
  id: string;
  title?: string;
  users: User[];
  creator: User;
  owner: User;
  messages: GroupMessage[];
  createdAt: number;
  lastMessageSent: Message;
  lastMessageSentAt: Date;
  avatar?: string;
};

export type GroupMessage = {
  id: string;
  content?: string;
  createdAt: string;
  author: User;
  group: Group;
  attachments?: MessageAttachment[];
};

export type MessageAttachment = {
  key: string;
};

export type GroupMessages = {
  groupId: string;
  messages: GroupMessage[];
};

export type GroupMessageEventPayload = {
  message: GroupMessage;
  group: Group;
};

export type GroupMessageDeletePayload = {
  userId: string;
  groupId: string;
  messageId: string;
};

export type AddGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type RemoveGroupUserMessagePayload = {
  group: Group;
  user: User;
};

export type GroupParticipantLeftPayload = {
  group: Group;
  userId: string;
};
