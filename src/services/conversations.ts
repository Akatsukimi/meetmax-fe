import axiosInstance from "@/lib/axiosInstance";
import {Conversation, CreateConversationParams} from "@/lib/types";

export const getConversations = async (): Promise<Conversation[]> => {
    const response =  await axiosInstance.get("/api/conversations");
    return response.data
};

export const postNewConversation = async (data: CreateConversationParams) => {
    return await axiosInstance.post("/api/conversations", data);
};

export const getConversationMessages = async (conversationId: string) => {
    const response = await axiosInstance.get(`/api/messages/${conversationId}`);
    return response.data
};

export const createMessage = async (
    {conversationId, content}: {
        conversationId: string,
        content: string
    }
) => {
    return await axiosInstance.post("/api/messages", {
        conversationId,
        content,
    });
};
