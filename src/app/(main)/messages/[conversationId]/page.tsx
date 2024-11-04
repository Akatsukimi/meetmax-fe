"use client";

import ConversationPanel from "@/components/conversations/conversation-panel";
import { useParams } from "next/navigation";
import { useContext, useEffect } from "react";
import { SocketContext } from "@/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { Conversation, Message, MessageEventPayload } from "@/lib/types";

const ConversationIdPage = () => {
    const socket = useContext(SocketContext);
    const queryClient = useQueryClient();

    useEffect(() => {
        socket.on('onMessage', (payload: MessageEventPayload) => {
            const { conversation, message } = payload;

            queryClient.setQueryData(['conversation-messages', conversation.id], (oldData: { messages: Message[] }) => {
                return {
                    ...oldData,
                    messages: [...oldData.messages, message],
                };
            });

            queryClient.setQueryData(['conversations'], (oldConversations: Conversation[] | undefined) => {
                if (!oldConversations) return [];
                const updatedConversations = oldConversations.map((conv) =>
                    conv.id === payload.conversation.id ? { ...conv, lastMessageSent: payload.message } : conv
                );
                const conversationIndex = updatedConversations.findIndex(conv => conv.id === payload.conversation.id);
                if (conversationIndex > -1) {
                    const [conversation] = updatedConversations.splice(conversationIndex, 1);
                    updatedConversations.unshift(conversation);
                }
                return updatedConversations;
            });
        });

        return () => {
            socket.off('onMessage');
        };
    }, [queryClient, socket]);

    return (
        <ConversationPanel />
    );
};

export default ConversationIdPage;