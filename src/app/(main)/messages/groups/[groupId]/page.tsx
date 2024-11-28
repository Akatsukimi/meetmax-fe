'use client';

import GroupPanel from '@/components/groups/group-panel';
import { useParams } from 'next/navigation';
import { useSocket } from '@/providers/socket-provider';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';
import {
  AddGroupUserMessagePayload,
  Group,
  GroupMessage,
  GroupMessageDeletePayload,
  GroupMessageEventPayload,
  GroupParticipantLeftPayload,
  RemoveGroupUserMessagePayload,
} from '@/lib/types';

const GroupIdPage = () => {
  const params = useParams<{ groupId: string }>();
  const socket = useSocket();
  const queryClient = useQueryClient();

  useEffect(() => {
    socket.on('onGroupMessage', (payload: GroupMessageEventPayload) => {
      const { group, messages } = payload;
      queryClient.setQueryData(
        ['group-messages', group.id],
        (oldData: { messages: GroupMessage[] }) => {
          return {
            ...oldData,
            messages: [...oldData.messages, ...messages],
          };
        },
      );

      // Update the last message sent in the group in the cache
      queryClient.setQueryData(['groups'], (oldGroups: Group[] | undefined) => {
        if (!oldGroups) return [];
        const updatedGroups = oldGroups.map((grp) =>
          grp.id === group.id
            ? {
                ...grp,
                lastMessageSent: group.lastMessageSent,
                lastMessageSentAt: new Date(),
              }
            : grp,
        );
        const groupIndex = updatedGroups.findIndex(
          (grp) => grp.id === group.id,
        );
        if (groupIndex > -1) {
          const [updatedGroup] = updatedGroups.splice(groupIndex, 1);
          updatedGroups.unshift(updatedGroup);
        }
        return updatedGroups;
      });
    });

    socket.on('onGroupCreate', (payload: Group) => {
      queryClient.setQueryData(['groups'], (oldGroups: Group[] | undefined) => {
        if (!oldGroups) return [payload];
        return [payload, ...oldGroups];
      });
    });

    socket.on('onGroupMessageDelete', (payload: GroupMessageDeletePayload) => {
      queryClient.setQueryData(
        ['group-messages', payload.groupId],
        (oldData: { messages: GroupMessage[] }) => {
          return {
            ...oldData,
            messages: oldData.messages.filter(
              (msg) => msg.id !== payload.messageId,
            ),
          };
        },
      );
    });

    /**
     * Adds the group for the user being added
     * to the group.
     */
    socket.on('onGroupUserAdd', (payload: AddGroupUserMessagePayload) => {
      console.log('onGroupUserAdd');
      console.log(payload);
    });

    /**
     * Update all other clients in the room
     * so that they can also see the participant
     */
    socket.on(
      'onGroupReceivedNewUser',
      ({ group }: AddGroupUserMessagePayload) => {
        console.log('Received onGroupReceivedNewUser');
      },
    );

    socket.on(
      'onGroupRecipientRemoved',
      ({ group }: RemoveGroupUserMessagePayload) => {
        console.log('onGroupRecipientRemoved');
      },
    );

    socket.on('onGroupRemoved', (payload: RemoveGroupUserMessagePayload) => {});

    socket.on(
      'onGroupParticipantLeft',
      ({ group, userId }: GroupParticipantLeftPayload) => {
        console.log('onGroupParticipantLeft received');
      },
    );

    socket.on('onGroupOwnerUpdate', (group: Group) => {
      console.log('received onGroupOwnerUpdate');
    });

    return () => {
      socket.off('onGroupMessage');
      socket.off('onGroupCreate');
      socket.off('onGroupUserAdd');
      socket.off('onGroupReceivedNewUser');
      socket.off('onGroupRecipientRemoved');
      socket.off('onGroupRemoved');
      socket.off('onGroupParticipantLeft');
      socket.off('onGroupOwnerUpdate');
    };
  }, [params.groupId, queryClient, socket]);

  return <GroupPanel />;
};

export default GroupIdPage;
