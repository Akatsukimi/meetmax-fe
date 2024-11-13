"use client";

import { useParams } from "next/navigation";
import { useAuth } from "@/providers/auth-provider";
import { useState, useEffect } from "react";
import { Group, GroupMessage } from "@/lib/types";
import { useSocket } from "@/providers/socket-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Separator } from "@/components/ui/separator";
import MessageEditor from "@/components/messages/message-editor";
import GroupHeader from "@/components/groups/group-header";
import GroupMessageBody from "@/components/groups/group-message-body";
import { getGroupMessages } from "@/services/groups";
import { formatGroupMessages } from "@/lib/format";

const GroupPanel = () => {
  const params = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const [stateRelying, setStateRelying] = useState<{
    isRelying: boolean;
    message: GroupMessage | null;
  }>({ isRelying: false, message: null });
  const [stateEditing, setStateEditing] = useState<{
    isEditing: boolean;
    message: GroupMessage | null;
  }>({ isEditing: false, message: null });
  const socket = useSocket();
  const queryClient = useQueryClient();
  const [isRecipientTyping, setIsRecipientTyping] = useState(false);
  const { data: groupMessages, isLoading: isGroupMessagesLoading } = useQuery({
    queryKey: ["group-messages", params.groupId],
    queryFn: () => getGroupMessages(params.groupId),
    staleTime: Infinity,
  });
  const groups = queryClient.getQueryData<Group[]>(["groups"]);

  let typingTimeout: NodeJS.Timeout | null = null;

  const sendTypingStatus = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    socket.emit("onTypingStart", {
      groupId: params.groupId,
      user,
    });
    typingTimeout = setTimeout(() => {
      socket.emit("onTypingStop", { groupId: params.groupId, user });
    }, 1000);
  };

  useEffect(() => {
    socket.emit('onGroupJoin', { groupId: params.groupId });
    socket.on("onTypingStart", () => {
      console.log("onTypingStart: User has started typing...");
      setIsRecipientTyping(true);
    });
    socket.on("onTypingStop", () => {
      console.log("onTypingStop: User has stopped typing...");
      setIsRecipientTyping(false);
    });

    return () => {
      socket.emit('onGroupLeave', { groupId: params.groupId, user });
      socket.off("onTypingStart");
      socket.off("onTypingStop");
    };
  }, [params.groupId, socket]);

  const currentGroup = groups?.find((group) => group.id === params.groupId);
  if (!user || !currentGroup) return null;

  const handleReplyClick = (message: GroupMessage) => {
    setStateRelying({ isRelying: true, message });
    handleCloseEditing();
  };

  const handleCloseRelying = () => {
    setStateRelying({ isRelying: false, message: null });
  };

  const handleEditClick = (message: GroupMessage) => {
    setStateEditing({ isEditing: true, message });
    handleCloseRelying();
  }

  const handleCloseEditing = () => {
    setStateEditing({ isEditing: false, message: null });
  }

  return (
    <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
      <GroupHeader group={currentGroup} />
      <Separator />
      {isGroupMessagesLoading ? (
        <div className='flex items-center justify-center w-full h-full'>
          <div className='p-2 border border-t-0 rounded-full animate-spin'></div>
        </div>
      ) : (
        <GroupMessageBody
          isRecipientTyping={isRecipientTyping}
          messages={formatGroupMessages(groupMessages, params.groupId)}
          user={user}
          onReplyClick={handleReplyClick}
          onEditClick={handleEditClick}
        />
      )}
      <Separator />
      <div className='py-2 px-5'>
        <MessageEditor
          sendTypingStatus={sendTypingStatus}
          stateRelying={stateRelying}
          setStateReplying={handleCloseRelying}
          stateEditing={stateEditing}
          setStateEditing={handleCloseEditing}
        />
      </div>
    </div>
  );
};

export default GroupPanel;
