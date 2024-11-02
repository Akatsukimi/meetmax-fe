import { ConversationMessage } from "./types";

export const formatConversationMessages = (
  conversationMessages: ConversationMessage[],
  id: string | undefined
) => {
  return conversationMessages.find((m) => m.id === id)?.messages || [];
};
