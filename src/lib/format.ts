import {
  Conversation,
  ConversationMessages,
  GroupMessage,
  GroupMessages,
  Message,
  User,
} from "./types";

export const formatConversationMessages = (
  conversationMessages: ConversationMessages,
  id: string
): Message[] => {
  if (conversationMessages.conversationId === id) {
    return conversationMessages.messages;
  }

  return [];
};

export const getRecipientFromConversation = (
  conversation?: Conversation,
  user?: User | null
) => {
  if (!conversation || !user) return null;

  return user?.id === conversation?.creator.id
    ? conversation?.recipient
    : conversation?.creator;
};

export const formatGroupMessages = (
  groupMessages: GroupMessages,
  groupId: string
): GroupMessage[] => {
  if (groupMessages.groupId === groupId) {
    return groupMessages.messages;
  }
  return [];
};
