import {ConversationMessages, Message} from "./types";

export const formatConversationMessages = (
    conversationMessages: ConversationMessages,
    id: string
): Message[] => {
  if (conversationMessages.conversationId === id) {
    return conversationMessages.messages;
  }

  return [];
};
