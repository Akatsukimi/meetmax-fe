import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import MessageEditor from "../messages/message-editor";
import ConversationHeader from "./conversation-header";
import { MessageType } from "@/lib/types";
import { differenceInMinutes, format, isToday, isYesterday } from "date-fns";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface ConversationPanelProps {
  messages: MessageType[];
  isMessagesLoading: boolean;
  userId: string;
}

const TIME_THRESHOLD = 5;

const formatDateLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  if (isToday(date)) return "Today";
  if (isYesterday(date)) return "Yesterday";
  return format(date, "EEEE, MMMM d");
};

const ConversationPanel = ({
  messages,
  isMessagesLoading,
  userId,
}: ConversationPanelProps) => {
  const groupedMessages = messages?.reduce((groups, message) => {
    if (!message) return groups;
    const date = new Date(message.createdAt);
    const dateKey = format(date, "yyyy-MM-dd");
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].unshift(message);
    return groups;
  }, {} as Record<string, typeof messages>);

  return (
    <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
      <ConversationHeader />
      <Separator />
      <ScrollArea className='flex-1 px-4.5 py-2'>
        {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
          <div key={dateKey}>
            <div className='text-center my-2 relative'>
              <hr className='absolute top-1/2 left-0 right-0 border-t border-gray-300' />
              <span className='relative inline-block bg-white px-4 py-1 rounded-full text-xs border border-gray-300 shadow-sm'>
                {formatDateLabel(dateKey)}
              </span>
            </div>
            {messages.reverse().map((message, index) => {
              if (!message) return null;
              const prevMessage = messages[index - 1];
              const isCompact =
                prevMessage &&
                message?.author.id === prevMessage.author.id &&
                differenceInMinutes(
                  new Date(message.createdAt),
                  new Date(prevMessage.createdAt)
                ) < TIME_THRESHOLD;
              return (
                <div key={message.id} className='flex items-start'>
                  {/* Only show avatar if this is the first message in a group */}
                  {!isCompact && (
                    <Avatar className='size-10'>
                      <AvatarImage src={message.author.avatar} />
                      <AvatarFallback>
                        {message.author.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div style={{ marginLeft: isCompact ? "50px" : "10px" }}>
                    {message.content}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </ScrollArea>
      <Separator />
      <div className='p-5'>
        <MessageEditor />
      </div>
    </div>
  );
};

export default ConversationPanel;
