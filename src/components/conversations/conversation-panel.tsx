"use client";

import { Separator } from "../ui/separator";
import MessageEditor from "../messages/message-editor";
import ConversationHeader from "./conversation-header";
import { useEffect, useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import MessageBody from "@/components/messages/message-body";
import { useParams, usePathname } from "next/navigation";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getConversationMessages } from "@/services/conversations";
import { Conversation, GroupMessage, Message } from "@/lib/types";
import { formatConversationMessages } from "@/lib/format";
import { useSocket } from "@/providers/socket-provider";

const ConversationPanel = () => {
  const params = useParams<{ conversationId: string }>();
  const { user } = useAuth();
  const [stateEditing, setStateEditing] = useState<{
    isEditing: boolean;
    message: Message | null;
  }>({ isEditing: false, message: null });
  const [stateRelying, setStateRelying] = useState<{
    isRelying: boolean;
    message: Message | null;
  }>({ isRelying: false, message: null });
  const socket = useSocket();
  const queryClient = useQueryClient();
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const {
    data: conversationMessages,
    isLoading: isConversationMessagesLoading,
  } = useQuery({
    queryKey: ["conversation-messages", params.conversationId],
    queryFn: () => getConversationMessages(params.conversationId),
    staleTime: Infinity,
  });
  const conversations = queryClient.getQueryData<Conversation[]>([
    "conversations",
  ]);

  useEffect(() => {
    socket.emit("onConversationJoin", {
      conversationId: params.conversationId,
    });
    socket.on("userJoin", () => {
      console.log("userJoin");
    });
    socket.on("userLeave", () => {
      console.log("userLeave");
    });
    socket.on("onTypingStart", () => {
      console.log("onTypingStart: User has started typing...");
      setIsRecipientTyping(true);
    });
    socket.on("onTypingStop", () => {
      console.log("onTypingStop: User has stopped typing...");
      setIsRecipientTyping(false);
    });
    socket.on("onMessageUpdate", (message) => {
      console.log("onMessageUpdate received");
      console.log(message);
    });

    return () => {
      socket.emit("onConversationLeave", {
        conversationId: params.conversationId,
      });
      socket.off("userJoin");
      socket.off("userLeave");
      socket.off("onTypingStart");
      socket.off("onTypingStop");
      socket.off("onMessageUpdate");
    };
  }, [params.conversationId, socket]);

  let typingTimeout: NodeJS.Timeout | null = null;

  const sendTypingStatus = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    socket.emit("onTypingStart", {
      conversationId: params.conversationId,
      user,
    });
    typingTimeout = setTimeout(() => {
      socket.emit("onTypingStop", { conversationId: params.conversationId });
    }, 1000);
  };

  const currentConversation = conversations?.find(
    (conversation) => conversation.id === params.conversationId
  );
  if (!user) return null;
  const otherParticipant =
    currentConversation &&
    (currentConversation.creator.id === user.id
      ? currentConversation.recipient
      : currentConversation.creator);

  const handleReplyClick = (message: Message) => {
    setStateRelying({ isRelying: true, message });
    handleCloseEditing();
  };

  const handleCloseRelying = () => {
    setStateRelying({ isRelying: false, message: null });
  };

  const handleEditClick = (message: Message) => {
    setStateEditing({ isEditing: true, message });
    handleCloseRelying();
  };

  const handleCloseEditing = () => {
    setStateEditing({ isEditing: false, message: null });
  };

  return (
    <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
      <ConversationHeader recipient={otherParticipant} />
      <Separator />
      {isConversationMessagesLoading ? (
        <div className='flex items-center justify-center w-full h-full'>
          <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
        </div>
      ) : (
        <MessageBody
          isRecipientTyping={isRecipientTyping}
          messages={formatConversationMessages(
            conversationMessages,
            params.conversationId
          )}
          user={user}
          onReplyClick={handleReplyClick}
          onEditClick={handleEditClick}
        />
      )}
      <Separator />
      <div className='py-2 px-5'>
        <MessageEditor
          sendTypingStatus={sendTypingStatus}
          stateEditing={stateEditing}
          setStateEditing={handleCloseEditing}
          stateRelying={stateRelying}
          setStateReplying={handleCloseRelying}
        />
      </div>
    </div>
  );
};

export default ConversationPanel;
