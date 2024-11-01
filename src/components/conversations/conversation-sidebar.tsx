"use client";

import {ScrollArea} from "../ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {format, isToday, isYesterday} from "date-fns";
import {useParams, useRouter} from "next/navigation";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useEffect} from "react";


const formatFullTime = (date: Date) => {
    if (!date) return "";
    return `${
        isToday(date)
            ? "Today"
            : isYesterday(date)
                ? "Yesterday"
                : format(date, "MMM d, yyyy")
    } at ${format(date, "h:mm:ss a")}`;
};

const ConversationSidebar = () => {
    const router = useRouter();
    const params = useParams<{ conversationId: string }>()
    const {conversations} = useSelector(
        (state: RootState) => state.conversation
    );

    useEffect(() => {
        if (!params.conversationId && conversations.length > 0) {
            router.push(`/messages/${conversations[0]?.id}`);
        }
    }, []);

    return (
        <ScrollArea className='flex-1 overflow-auto'>
            {conversations.map((conversation) => (
                <div
                    className='flex p-3 transition-all mx-3 rounded-md cursor-pointer hover:bg-gray-100 gap-2.5 items-center'
                    key={conversation.id}
                    onClick={() => router.push(`/messages/${conversation.id}`)}
                >
                    <Avatar className='size-10'>
                        <AvatarImage src={conversation.recipient.avatar}/>
                        <AvatarFallback>
                            {conversation.recipient.username.charAt(0).toUpperCase()}
                        </AvatarFallback>
                    </Avatar>
                    <div className='flex flex-col w-full'>
                        <p className='font-bold'>{conversation.recipient.username}</p>
                        <div className='flex items-center justify-between'>
                            <p className='text-sm font-normal text-foreground/60'>
                                {conversation.lastMessageSent?.content || "Content"}
                            </p>
                            <p className='text-sm font-normal text-foreground/60'>
                                {formatFullTime(conversation.lastMessageSent?.createdAt)}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </ScrollArea>
    );
};

export default ConversationSidebar;
