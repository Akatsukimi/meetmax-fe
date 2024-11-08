import { ScrollArea } from "@/components/ui/scroll-area";
import { differenceInMinutes, format, isThisWeek, isToday } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, User } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { EllipsisVertical, Reply, Smile } from "lucide-react";
import Hint from "@/components/shared/hint";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteMessage } from "@/services/conversations";
import { useParams } from "next/navigation";

interface IMessageBodyProps {
  messages: Message[];
  user: User;
  onReplyClick: (message: Message) => void;
  isRecipientTyping: boolean;
}

const TIME_THRESHOLD = 15;

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) {
    return format(date, "h:mm a");
  }
  if (isThisWeek(date)) {
    return format(date, "EEE h:mm a");
  }
  return format(date, "MMM d, yyyy, h:mm a");
};

const MessageBody = ({
  messages,
  user,
  onReplyClick,
  isRecipientTyping,
}: IMessageBodyProps) => {
  const params = useParams<{ conversationId: string }>();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: deleteMessage,
    onMutate: async ({ conversationId, messageId }) => {
      await queryClient.cancelQueries({
        queryKey: ["conversation-messages", conversationId],
      });
      const previousMessages = queryClient.getQueryData<{
        messages: Message[];
      }>(["conversation-messages", conversationId]);
      queryClient.setQueryData(
        ["conversation-messages", conversationId],
        (old: { messages: Message[] } | undefined) => ({
          ...old,
          messages: old?.messages.filter(
            (message: Message) => message.id !== messageId
          ),
        })
      );
      return { previousMessages };
    },
    onError: (error, variables, context) => {
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["conversation-messages", variables.conversationId],
          context.previousMessages
        );
      }
    },
  });

  const handleDeleteMessage = (messageId: string) => {
    mutation.mutate({ conversationId: params.conversationId, messageId });
  };

  const groupedMessages = messages?.reduce((groups, message) => {
    if (!message) return groups;
    const date = new Date(message.createdAt);
    const dateKey = format(date, "yyyy-MM-dd HH:00");
    if (!groups[dateKey]) {
      groups[dateKey] = { time: message.createdAt, messages: [] };
    }
    groups[dateKey].messages.unshift(message);
    return groups;
  }, {} as Record<string, { time: string; messages: Message[] }>);

  return (
    <ScrollArea scrollToBottom={true} className='flex-1 px-4.5 py-2'>
      {Object.entries(groupedMessages || {}).map(([dateKey, group]) => (
        <div key={dateKey}>
          <div className='relative my-2 text-center'>
            <span className='relative inline-block px-4 py-1 text-xs text-foreground/70'>
              {formatDateLabel(group.time)}
            </span>
          </div>
          {group.messages.reverse().map((message, index) => {
            if (!message) return null;

            const prevMessage = group.messages[index + 1];
            const isCompact =
              prevMessage &&
              message?.author.id === prevMessage.author.id &&
              differenceInMinutes(
                new Date(message.createdAt),
                new Date(prevMessage.createdAt)
              ) < TIME_THRESHOLD;

            const isCurrentUser = message.author.id === user.id;

            return (
              <div
                key={message.id}
                className={`flex items-start mb-1 ${
                  isCurrentUser ? "flex-row-reverse" : ""
                }`}
              >
                {!isCurrentUser && !isCompact && (
                  <Avatar className='size-10 mr-2'>
                    <AvatarImage src={message.author.avatar} />
                    <AvatarFallback>
                      {message.author.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "flex items-center gap-2 group/message",
                    isCurrentUser && "flex-row-reverse"
                  )}
                >
                  <Hint
                    side='left'
                    label={format(new Date(message.createdAt), "hh:mm")}
                  >
                    <div
                      className={`${
                        isCompact
                          ? isCurrentUser
                            ? ""
                            : "ml-14"
                          : isCurrentUser
                          ? ""
                          : "ml-2"
                      } max-w-[550px] break-words bg-primary text-white px-3.5 py-2 rounded-2xl ${
                        isCurrentUser ? "" : ""
                      }`}
                    >
                      {message.content}
                    </div>
                  </Hint>
                  <div
                    className={cn(
                      "opacity-0 group-hover/message:opacity-100 transition-opacity flex items-center gap-1",
                      isCurrentUser && "flex-row-reverse"
                    )}
                  >
                    <Button
                      variant='ghost'
                      size='iconSm'
                      className='rounded-full'
                    >
                      <Smile className='size-2 text-foreground/50' />
                    </Button>
                    <Button
                      variant='ghost'
                      size='iconSm'
                      className='rounded-full'
                      onClick={() => onReplyClick(message)}
                    >
                      <Reply className='size-2 text-foreground/50' />
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant='ghost'
                          size='iconSm'
                          className='rounded-full'
                        >
                          <EllipsisVertical className='size-2 text-foreground/50' />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='w-28' align='center'>
                        {isCurrentUser && (
                          <>
                            <DropdownMenuItem className='cursor-pointer'>
                              <span>Edit</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className='cursor-pointer'
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <span>Unsent</span>
                            </DropdownMenuItem>
                          </>
                        )}
                        {!isCurrentUser && (
                          <DropdownMenuItem className='cursor-pointer'>
                            <span>Remove</span>
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem className='cursor-pointer'>
                          <span>Forward</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>
                          <span>Pin</span>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
      {isRecipientTyping && (
        <div className='flex items-center gap-2'>
          <Avatar className='size-10 mr-2'>
            <AvatarImage src={user.avatar} />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className='h-10 flex space-x-2 justify-center items-center bg-primary px-3.5 py-2 rounded-2xl'>
            <div className='size-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='size-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='size-1.5 bg-white rounded-full animate-bounce'></div>
          </div>
        </div>
      )}
    </ScrollArea>
  );
};

export default MessageBody;
