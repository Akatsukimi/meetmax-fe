"use client";

import {ScrollArea} from "../ui/scroll-area";
import {Avatar, AvatarFallback, AvatarImage} from "../ui/avatar";
import {
    differenceInDays,
    differenceInHours,
    differenceInMinutes,
    differenceInSeconds,
    differenceInWeeks,
} from "date-fns";
import {useParams, usePathname, useRouter} from "next/navigation";
import {getConversations} from "@/services/conversations";
import {useQuery} from "@tanstack/react-query";
import {Conversation} from "@/lib/types";
import {cn} from "@/lib/utils";
import {useContext} from "react";
import {AuthContext} from "@/providers/auth-provider";
import {getRecipientFromConversation} from "@/lib/format";

const formatDateLabel = (dateStr: Date) => {
    const date = new Date(dateStr);
    const now = new Date();
    if(!dateStr) return "";
    const seconds = differenceInSeconds(now, date);
    if (seconds < 60) {
        return `${seconds}s`;
    }
    const minutes = differenceInMinutes(now, date);
    if (minutes < 60) {
        return `${minutes}m`;
    }
    const hours = differenceInHours(now, date);
    if (hours < 24) {
        return `${hours}h`;
    }
    const days = differenceInDays(now, date);
    if (days < 7) {
        return `${days}d`;
    }
    const weeks = differenceInWeeks(now, date);
    return `${weeks}w`;
};

const ConversationSidebar = () => {
    const router = useRouter();
    const params = useParams<{ conversationId: string }>()
    const pathname = usePathname();
    const {user} = useContext(AuthContext)

    const {data: conversations, isLoading} = useQuery<Conversation[]>({
        queryKey: ['conversations'],
        queryFn: getConversations,
        staleTime: Infinity
    })

    if (isLoading || !conversations) return <div>Loading...</div>


    if (pathname === '/messages' && conversations.length > 0) {
        router.push(`/messages/${conversations[0].id}`)
    }

    if(!user) return null

    return (
        <ScrollArea className='flex-1 overflow-auto'>
            {conversations.map((conversation: Conversation) =>{
                const recipient = getRecipientFromConversation(conversation, user);
                return (
                    <div
                        className={cn('flex p-3 transition-all mx-3 rounded-md cursor-pointer hover:bg-gray-100 gap-2.5 items-center', params.conversationId === conversation.id && 'bg-gray-200 hover:bg-gray-200')}
                        key={conversation.id}
                        onClick={() => router.push(`/messages/${conversation.id}`)}
                    >
                        <Avatar className='size-10'>
                            <AvatarImage src={conversation.recipient.avatar}/>
                            <AvatarFallback>
                                {recipient?.username.charAt(0).toUpperCase()}
                            </AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col w-full'>
                            <p className='font-bold'>{recipient?.username}</p>
                            <div className='flex items-center justify-between'>
                                <p className='text-sm font-normal text-foreground/60'>
                                    {conversation.lastMessageSent?.content || "Content"}
                                </p>
                                <p className='text-sm font-normal text-foreground/60'>
                                    {formatDateLabel(conversation.lastMessageSent?.createdAt)}
                                </p>
                            </div>
                        </div>
                    </div>
                )
            })}
        </ScrollArea>
    );
};

export default ConversationSidebar;
