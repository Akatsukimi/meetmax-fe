import axiosInstance from "@/lib/axiosInstance";

export const getConversations = async () => {
  const response = await axiosInstance.get("/api/conversations");
  return response.data;
};

export const getConversationMessages = async (conversationId: string) => {
  const response = await axiosInstance.get(`/api/messages/${conversationId}`);
  return response.data;
};
