"use client";

import {Separator} from "../ui/separator";
import MessageEditor from "../messages/message-editor";
import ConversationHeader from "./conversation-header";
import {useContext} from "react";
import {AuthContext} from "@/providers/auth-provider";
import MessageBody from "@/components/messages/message-body";
import {useParams} from "next/navigation";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {getConversationMessages} from "@/services/conversations";
import {Conversation} from "@/lib/types";
import {formatConversationMessages} from "@/lib/format";

const ConversationPanel = () => {
    const params = useParams<{ conversationId: string }>()
    const {user} = useContext(AuthContext)
    const queryClient = useQueryClient()
    const {data: conversationMessages, isLoading: isConversationMessagesLoading} = useQuery({
        queryKey: ['conversation-messages', params.conversationId],
        queryFn: () => getConversationMessages(params.conversationId),
        staleTime: Infinity
    })

    const conversations = queryClient.getQueryData<Conversation[]>(['conversations']);

    const currentConversation = conversations?.find(
        (conversation) => conversation.id === params.conversationId
    );
    if(!user) return null;
    const otherParticipant =
        currentConversation &&
        (currentConversation.creator.id === user.id
            ? currentConversation.recipient
            : currentConversation.creator);

    return (
        <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
            <ConversationHeader
                recipient={otherParticipant}/>
            <Separator/>
            {isConversationMessagesLoading ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
                </div>
            ) : (
                <MessageBody messages={formatConversationMessages(conversationMessages, params.conversationId)} user={user}/>
            )}
            <Separator/>
            <div className='p-5'>
                <MessageEditor/>
            </div>
        </div>
    );
};

export default ConversationPanel;
