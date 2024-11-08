"use client";

import ConversationSidebar from "@/components/conversations/conversation-sidebar";
import CreateConversationModal from "@/components/modals/create-conversation-modal";
import { Input } from "@/components/ui/input";
import { Loader2, Search } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Conversation } from "@/lib/types";
import { getConversations } from "@/services/conversations";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { isLoading } = useQuery<Conversation[]>({
    queryKey: ["conversations"],
    queryFn: getConversations,
    staleTime: Infinity,
  });

  return (
    <div className='flex flex-grow'>
      <div className='bg-gray-50 p-7.5  rounded-t-2xl flex-1'>
        <div className='flex h-full gap-x-7.5'>
          <div className='flex flex-col h-full w-[340px] bg-background rounded-lg overflow-hidden'>
            <div className='flex w-full items-center justify-between py-4 px-3 gap-5'>
              <Input icon={Search} placeholder='Search' className='ps-9' />
              <CreateConversationModal />
            </div>
            {isLoading ? (
              <div className='mt-2 mx-auto'>
                <Loader2 className='animate-spin text-foreground/70' />
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
