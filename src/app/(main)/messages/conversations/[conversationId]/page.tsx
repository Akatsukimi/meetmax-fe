'use client';

import ConversationPanel from '@/components/conversations/conversation-panel';
import { useEffect } from 'react';
import { useSocket } from '@/providers/socket-provider';
import { useQueryClient } from '@tanstack/react-query';
import { Conversation, Message, MessageEventPayload } from '@/lib/types';
import { useParams } from 'next/navigation';

const ConversationIdPage = () => {
  const params = useParams<{ conversationId: string }>();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('onMessage', (payload: MessageEventPayload) => {
      const { conversation, messages } = payload;
      queryClient.setQueryData(
        ['conversation-messages', conversation.id],
        (oldData: { messages: Message[] }) => {
          return {
            ...oldData,
            messages: [...oldData.messages, ...messages],
          };
        },
      );

      queryClient.setQueryData(
        ['conversations'],
        (oldConversations: Conversation[] | undefined) => {
          if (!oldConversations) return [];
          const updatedConversations = oldConversations.map((conv) =>
            conv.id === payload.conversation.id
              ? {
                  ...conv,
                  lastMessageSent: payload.conversation.lastMessageSent,
                }
              : conv,
          );
          const conversationIndex = updatedConversations.findIndex(
            (conv) => conv.id === payload.conversation.id,
          );
          if (conversationIndex > -1) {
            const [conversation] = updatedConversations.splice(
              conversationIndex,
              1,
            );
            updatedConversations.unshift(conversation);
          }
          return updatedConversations;
        },
      );
    });
    socket.on('onConversation', (payload: Conversation) => {
      queryClient.setQueryData(
        ['conversations'],
        (oldConversations: Conversation[] | undefined) => {
          if (!oldConversations) return [];
          return [payload, ...oldConversations];
        },
      );
    });
    socket.on('onMessageDelete', (payload) => {
      queryClient.setQueryData(
        ['conversation-messages', payload.conversationId],
        (oldData: { messages: Message[] }) => {
          return {
            ...oldData,
            messages: oldData.messages.filter(
              (msg) => msg.id !== payload.messageId,
            ),
          };
        },
      );
    });

    return () => {
      socket.off('onMessage');
      socket.off('onConversation');
      socket.off('onMessageDelete');
    };
  }, [queryClient, socket, params.conversationId]);

  return <ConversationPanel />;
};

export default ConversationIdPage;
