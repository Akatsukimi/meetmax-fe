"use client";

import ConversationPanel from "@/components/conversations/conversation-panel";
import {fetchMessagesThunk} from "@/lib/features/messages/messageSlice";
import {AppDispatch} from "@/lib/store";
import {useParams} from "next/navigation";
import {useContext, useEffect} from "react";
import {useDispatch} from "react-redux";
import {SocketContext} from "@/providers/socket-provider";

const ConversationIdPage = () => {
    const params = useParams<{ conversationId: string }>();
    const dispatch = useDispatch<AppDispatch>();
        const socket = useContext(SocketContext);

    useEffect(() => {
        dispatch(fetchMessagesThunk(params.conversationId));
    }, [dispatch, params.conversationId]);

    useEffect(() => {
    }, []);

    return (
        <ConversationPanel/>
    );
};

export default ConversationIdPage;
