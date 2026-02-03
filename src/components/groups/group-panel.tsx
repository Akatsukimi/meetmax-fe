'use client';

import { useParams } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import { useState, useEffect } from 'react';
import { Group, GroupMessage, Message, User } from '@/lib/types';
import { useSocket } from '@/providers/socket-provider';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Separator } from '@/components/ui/separator';
import MessageEditor from '@/components/messages/message-editor';
import GroupHeader from '@/components/groups/group-header';
import { getGroupMessages } from '@/services/groups';
import { formatGroupMessages } from '@/lib/format';
import MessageBody from '../messages/message-body';

const GroupPanel = () => {
  const params = useParams<{ groupId: string }>();
  const { user } = useAuth();
  const [stateRelying, setStateRelying] = useState<{
    isRelying: boolean;
    message: GroupMessage | Message | null;
  }>({ isRelying: false, message: null });
  const [stateEditing, setStateEditing] = useState<{
    isEditing: boolean;
    message: GroupMessage | Message | null;
  }>({ isEditing: false, message: null });
  const socket = useSocket();
  const queryClient = useQueryClient();
  const [typingUsers, setTypingUsers] = useState<User[]>([]);
  const { data: groupMessages, isLoading: isGroupMessagesLoading } = useQuery({
    queryKey: ['group-messages', params.groupId],
    queryFn: () => getGroupMessages(params.groupId),
    staleTime: Infinity,
  });
  const groups = queryClient.getQueryData<Group[]>(['groups']);
  let typingTimeout: NodeJS.Timeout | null = null;

  const sendTypingStatus = () => {
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    socket.emit('onTypingStart', {
      groupId: params.groupId,
      user,
    });
    typingTimeout = setTimeout(() => {
      socket.emit('onTypingStop', { groupId: params.groupId, user });
    }, 1000);
  };

  useEffect(() => {
    socket.emit('onGroupJoin', { groupId: params.groupId });
    socket.on('onTypingStart', (data: { user: User; groupId: string }) => {
      if (data.user && data.user.id !== user!.id) {
        setTypingUsers((prev) => {
          if (prev.some((u) => u.id === data.user.id)) return prev;
          return [...prev, data.user];
        });
      }
    });
    socket.on('onTypingStop', (data: { user: User; groupId: string }) => {
      if (data.user) {
        setTypingUsers((prev) => prev.filter((u) => u.id !== data.user.id));
      }
    });

    return () => {
      socket.emit('onGroupLeave', { groupId: params.groupId, user });
      socket.off('onTypingStart');
      socket.off('onTypingStop');
    };
  }, [params.groupId, socket, user]);

  const currentGroup = groups?.find((group) => group.id === params.groupId);
  if (!user || !currentGroup) return null;

  const handleReplyClick = (message: GroupMessage | Message) => {
    setStateRelying({ isRelying: true, message });
    handleCloseEditing();
  };

  const handleCloseRelying = () => {
    setStateRelying({ isRelying: false, message: null });
  };

  const handleEditClick = (message: GroupMessage | Message) => {
    setStateEditing({ isEditing: true, message });
    handleCloseRelying();
  };

  const handleCloseEditing = () => {
    setStateEditing({ isEditing: false, message: null });
  };

  return (
    <div className="flex-grow bg-background rounded-lg flex flex-col overflow-hidden">
      <GroupHeader group={currentGroup} />
      <Separator />
      {isGroupMessagesLoading ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="p-2 border border-t-0 rounded-full animate-spin"></div>
        </div>
      ) : (
        <MessageBody
          typingUsers={typingUsers}
          messages={formatGroupMessages(groupMessages, params.groupId)}
          user={user}
          onReplyClick={handleReplyClick}
          onEditClick={handleEditClick}
        />
      )}
      <Separator />
      <MessageEditor
        sendTypingStatus={sendTypingStatus}
        stateRelying={stateRelying}
        setStateReplying={handleCloseRelying}
        stateEditing={stateEditing}
        setStateEditing={handleCloseEditing}
      />
    </div>
  );
};

export default GroupPanel;
