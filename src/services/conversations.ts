import axiosInstance from '@/lib/axiosInstance';
import {
  Attachment,
  Conversation,
  CreateConversationParams,
} from '@/lib/types';

export const getConversations = async (): Promise<Conversation[]> => {
  const response = await axiosInstance.get('/api/conversations');
  return response.data;
};

export const createConversation = async (data: CreateConversationParams) => {
  const response = await axiosInstance.post('/api/conversations', data);
  return response.data;
};

export const getConversationMessages = async (conversationId: string) => {
  const response = await axiosInstance.get(
    `/api/conversations/${conversationId}/messages`,
  );
  return response.data;
};

export const createMessage = async ({
  conversationId,
  content,
  attachments,
  parentMessageId,
}: {
  conversationId: string;
  content?: string;
  attachments?: Attachment[];
  parentMessageId?: string;
}) => {
  return await axiosInstance.post(
    `/api/conversations/${conversationId}/messages`,
    {
      content,
      attachments,
      parentMessageId,
    },
  );
};

export const editMessage = async ({
  conversationId,
  messageId,
}: {
  conversationId: string;
  messageId: string;
}) => {
  const response = await axiosInstance.patch(
    `/api/conversations/${conversationId}/messages/${messageId}`,
  );
  return response.data;
};

export const deleteMessage = async ({
  conversationId,
  messageId,
}: {
  conversationId: string;
  messageId: string;
}) => {
  const response = await axiosInstance.delete(
    `/api/conversations/${conversationId}/messages/${messageId}`,
  );
  return response.data;
};
