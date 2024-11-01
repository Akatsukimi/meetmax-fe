"use client";

import ConversationPanel from "@/components/conversations/conversation-panel";
import {fetchMessagesThunk} from "@/lib/features/messages/messageSlice";
import {AppDispatch} from "@/lib/store";
import {useParams} from "next/navigation";
import {useEffect} from "react";
import {useDispatch} from "react-redux";

const ConversationIdPage = () => {
    const params = useParams<{ conversationId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchMessagesThunk(params.conversationId));
    }, [params.conversationId]);

    return (
        <ConversationPanel/>
    );
};

export default ConversationIdPage;
