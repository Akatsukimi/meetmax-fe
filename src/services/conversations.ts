import axiosInstance from "@/lib/axiosInstance";
import {CreateConversationParams} from "@/lib/types";

export const getConversations = async () => {
    return await axiosInstance.get("/api/conversations");
};

export const postNewConversation = async (data: CreateConversationParams) => {
    return await axiosInstance.post("/api/conversations", data);
};

export const getConversationMessages = async (conversationId: string) => {
    return await axiosInstance.get(`/api/messages/${conversationId}`);
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
