'use client';

import ConversationSidebar from '@/components/conversations/conversation-sidebar';
import CreateConversationModal from '@/components/modals/create-conversation-modal';
import { Input } from '@/components/ui/input';
import { Loader2, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { Conversation, Group } from '@/lib/types';
import { getConversations } from '@/services/conversations';
import { getGroups } from '@/services/groups';
import React from 'react';
import CreateGroupModal from '@/components/modals/create-group-modal';
import { useActiveTabStore } from '@/stores/active-tab-message.store';

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { activeTab } = useActiveTabStore();

  const { isLoading: isConversationsLoading } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: getConversations,
    staleTime: Infinity,
  });
  const { isLoading: isGroupsLoading } = useQuery<Group[]>({
    queryKey: ['groups'],
    queryFn: getGroups,
    staleTime: Infinity,
  });

  return (
    <div className="flex flex-grow">
      <div className="bg-gray-50 p-7.5  rounded-t-2xl flex-1">
        <div className="flex h-full gap-x-7.5">
          <div className="flex flex-col h-full lg:w-[340px] w-24 bg-background rounded-lg overflow-hidden">
            <div className="flex w-full items-center justify-between py-4 px-3 gap-5">
              <Input
                icon={Search}
                placeholder="Search"
                className="ps-9 hidden md:block"
                classNameIcon="hidden md:block"
              />
              {activeTab === 'conversations' ? (
                <CreateConversationModal />
              ) : (
                <CreateGroupModal />
              )}
            </div>
            {isConversationsLoading && isGroupsLoading ? (
              <div className="mt-2 mx-auto">
                <Loader2 className="animate-spin text-foreground/70" />
              </div>
            ) : (
              <ConversationSidebar />
            )}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
