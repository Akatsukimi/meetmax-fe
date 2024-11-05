import {ScrollArea} from "@/components/ui/scroll-area";
import {differenceInMinutes, format, isThisWeek, isToday} from "date-fns";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {Message, User} from "@/lib/types";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {EllipsisVertical, Reply, Smile} from "lucide-react";
import Hint from "@/components/shared/hint";

interface IMessageBodyProps {
    messages: Message[];
    user: User
    onReplyClick: (message: Message) => void;
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

const MessageBody = ({messages, user, onReplyClick}: IMessageBodyProps) => {
    const groupedMessages = messages?.reduce((groups, message) => {
        if (!message) return groups;
        const date = new Date(message.createdAt);
        const dateKey = format(date, "yyyy-MM-dd HH:00");
        if (!groups[dateKey]) {
            groups[dateKey] = { time: message.createdAt, messages: [] };
        }
        groups[dateKey].messages.unshift(message);
        return groups;
    }, {} as Record<string, { time: string, messages: Message[] }>);

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
                                        <AvatarImage src={message.author.avatar}/>
                                        <AvatarFallback>
                                            {message.author.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
                                <div
                                    className={cn('flex items-center gap-2 group/message', isCurrentUser && 'flex-row-reverse')}>
                                    <Hint side='left' label={format(new Date(message.createdAt), "hh:mm")}>
                                    <div
                                        className={`${
                                            isCompact
                                                ? isCurrentUser
                                                    ? ""
                                                    : "ml-14"
                                                : isCurrentUser
                                                    ? ""
                                                    : "ml-2"
                                        } max-w-[550px] break-words bg-purple-600 text-white px-3.5 py-2 rounded-2xl ${
                                            isCurrentUser ? "" : ""
                                        }`}
                                    >
                                        {message.content}
                                    </div>
                                    </Hint>
                                    <div
                                        className={cn('opacity-0 group-hover/message:opacity-100 transition-opacity flex items-center gap-1', isCurrentUser && 'flex-row-reverse')}>
                                        <Button variant='ghost' size='iconSm' className='rounded-full'>
                                            <Smile className='size-2 text-foreground/50'/>
                                        </Button>
                                        <Button variant='ghost' size='iconSm' className='rounded-full' onClick={() => onReplyClick(message)}>
                                            <Reply className='size-2 text-foreground/50'/>
                                        </Button>
                                        <Button variant='ghost' size='iconSm' className='rounded-full'>
                                            <EllipsisVertical className='size-2 text-foreground/50'/>
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            ))}
        </ScrollArea>

    );
};

export default MessageBody;