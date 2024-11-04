import {Conversation, ConversationMessages, Message, User} from "./types";

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
    user?: User
) => {
  return user?.id === conversation?.creator.id
      ? conversation?.recipient
      : conversation?.creator;
};
