import { ScrollArea } from '@/components/ui/scroll-area';
import { format } from 'date-fns';
import {
  Message as ConversationMessage,
  GroupMessage,
  User,
} from '@/lib/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMessage } from '@/services/conversations';
import { useParams } from 'next/navigation';
import Message from './message';
import { deleteGroupMessage } from '@/services/groups';
import MessageTyping from './message-typing';

interface IMessageBodyProps {
  messages: ConversationMessage[] | GroupMessage[];
  user: User;
  onReplyClick: (message: ConversationMessage | GroupMessage) => void;
  onEditClick: (message: ConversationMessage | GroupMessage) => void;
  isRecipientTyping: boolean;
}

const MessageBody = ({
  messages,
  user,
  onReplyClick,
  isRecipientTyping,
  onEditClick,
}: IMessageBodyProps) => {
  const params = useParams<{ conversationId?: string; groupId?: string }>();
  const queryClient = useQueryClient();

  const deleteMessageMutation = useMutation({
    mutationFn: deleteMessage,
    onMutate: async ({ conversationId, messageId }) => {
      await queryClient.cancelQueries({
        queryKey: ['conversation-messages', conversationId],
      });
      const previousMessages = queryClient.getQueryData<{
        messages: ConversationMessage[];
      }>(['conversation-messages', conversationId]);
      queryClient.setQueryData(
        ['conversation-messages', conversationId],
        (old: { messages: ConversationMessage[] } | undefined) => ({
          ...old,
          messages: old?.messages.filter(
            (message: ConversationMessage) => message.id !== messageId,
          ),
        }),
      );
      return { previousMessages };
    },
    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ['conversation-messages', variables.conversationId],
          context.previousMessages,
        );
      }
    },
  });

  const deleteGroupMessageMutation = useMutation({
    mutationFn: deleteGroupMessage,
    onMutate: async ({ groupId, messageId }) => {
      await queryClient.cancelQueries({
        queryKey: ['group-messages', groupId],
      });
      const previousMessages = queryClient.getQueryData<{
        messages: GroupMessage[];
      }>(['group-messages', groupId]);
      queryClient.setQueryData(
        ['group-messages', groupId],
        (old: { messages: GroupMessage[] } | undefined) => ({
          ...old,
          messages: old?.messages.filter(
            (message: GroupMessage) => message.id !== messageId,
          ),
        }),
      );
      return { previousMessages };
    },
    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ['group-messages', variables.groupId],
          context.previousMessages,
        );
      }
    },
  });

  const handleDeleteMessage = (messageId: string) => {
    if (params.conversationId) {
      deleteMessageMutation.mutate({
        conversationId: params.conversationId,
        messageId,
      });
    }
  };

  const handleDeleteGroupMessage = (messageId: string) => {
    if (params.groupId) {
      deleteGroupMessageMutation.mutate({
        groupId: params.groupId,
        messageId,
      });
    }
  };

  const groupMessagesByDate = messages?.reduce((groups, message) => {
    if (!message) return groups;
    const date = new Date(message.createdAt);
    const dateKey = format(date, 'yyyy-MM-dd HH:00');
    if (!groups[dateKey]) {
      groups[dateKey] = { time: message.createdAt, messages: [] };
    }
    groups[dateKey].messages.push(message);
    return groups;
  }, {} as Record<string, { time: string; messages: (ConversationMessage | GroupMessage)[] }>);

  return (
    <ScrollArea scrollToBottom={true} className="flex-1 px-4.5 py-2">
      {Object.entries(groupMessagesByDate || {}).map(([dateKey, group]) => (
        <Message
          group={group}
          handleDeleteMessage={
            params.conversationId
              ? handleDeleteMessage
              : handleDeleteGroupMessage
          }
          onEditClick={onEditClick}
          onReplyClick={onReplyClick}
          user={user}
          key={dateKey}
        />
      ))}
      {isRecipientTyping && <MessageTyping user={user} />}
    </ScrollArea>
  );
};

export default MessageBody;
