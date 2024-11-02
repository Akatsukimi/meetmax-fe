import {ScrollArea} from "@/components/ui/scroll-area";
import {differenceInMinutes, format, isToday, isYesterday} from "date-fns";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {MessageType, User} from "@/lib/types";


interface IMessageBodyProps {
    messages: MessageType[];
    user: User
}

const TIME_THRESHOLD = 5;

const formatDateLabel = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Today";
    if (isYesterday(date)) return "Yesterday";
    return format(date, "EEEE, MMMM d");
};

const MessageBody = ({messages, user}: IMessageBodyProps) => {
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
        <ScrollArea scrollToBottom={true} className='flex-1 px-4.5 py-2'>
            {Object.entries(groupedMessages || {}).map(([dateKey, messages]) => (
                <div key={dateKey}>
                    <div className='relative my-2 text-center'>
            <span className='relative inline-block px-4 py-1 text-xs'>
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

                        const isCurrentUser = message.author.id === user.id;

                        return (
                            <div
                                key={message.id}
                                className={`flex items-start mb-1 ${
                                    isCurrentUser ? "flex-row-reverse" : ""
                                }`}
                            >
                                {!isCurrentUser && !isCompact && (
                                    <Avatar className='w-10 h-10 mr-2'>
                                        <AvatarImage src={message.author.avatar}/>
                                        <AvatarFallback>
                                            {message.author.username.charAt(0).toUpperCase()}
                                        </AvatarFallback>
                                    </Avatar>
                                )}
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
                                        isCurrentUser ? "" : "rounded-bl-none"
                                    }`}
                                >
                                    {message.content}
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