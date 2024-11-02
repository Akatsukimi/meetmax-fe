"use client";

import {Separator} from "../ui/separator";
import MessageEditor from "../messages/message-editor";
import ConversationHeader from "./conversation-header";
import {useContext} from "react";
import {AuthContext} from "@/providers/auth-provider";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import MessageBody from "@/components/messages/message-body";
import {useParams} from "next/navigation";

const ConversationPanel = () => {
    const params = useParams<{ conversationId: string }>()
    const {user} = useContext(AuthContext)
    const {loading, messages: conversationMessages} = useSelector(
        (state: RootState) => state.messages
    );
    const {conversations} = useSelector(
        (state: RootState) => state.conversation
    );
    const conversation = conversations.find((conversation) => conversation.id === params.conversationId)
    if (!user) return null
    const recipient = conversation?.recipient.id === user.id ? conversation?.creator : conversation?.recipient

    return (
        <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
            <ConversationHeader
                recipient={recipient}/>
            <Separator/>
            {loading ? (
                <div className='flex items-center justify-center w-full h-full'>
                    <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
                </div>
            ) : (
                <MessageBody messages={conversationMessages[0]?.messages} user={user}/>
            )}
            <Separator/>
            <div className='p-5'>
                <MessageEditor/>
            </div>
        </div>
    );
};

export default ConversationPanel;
