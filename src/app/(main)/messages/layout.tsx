"use client";

import ConversationSidebar from "@/components/conversations/conversation-sidebar";
import CreateConversationModal from "@/components/modals/create-conversation-modal";
import Menubar from "@/components/shared/menubar";
import { Input } from "@/components/ui/input";
import { getConversations } from "@/services/conversations";
import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const MainLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const router = useRouter();
  const { data: conversationsData, isLoading: isConversationsLoading } =
    useQuery({
      queryKey: ["conversations"],
      queryFn: getConversations,
      staleTime: Infinity,
    });

  useEffect(() => {
    if (conversationsData && conversationsData.length > 0) {
      router.push(`/messages/${conversationsData[0].id}`);
    }
  }, [conversationsData, router]);

  return (
    <div className='flex flex-grow gap-4 px-7.5 overflow-hidden'>
      <Menubar className='sticky top-[4.625rem] hidden h-full flex-none space-y-3 rounded-2xl bg-card py-2.5 sm:block xl:w-48' />
      <div className='bg-gray-50 p-7.5 h-full rounded-t-2xl flex-1'>
        <div className='flex h-full gap-x-7.5'>
          <div className='flex flex-col h-full w-[340px] bg-background rounded-lg overflow-hidden'>
            <div className='flex w-full items-center justify-between py-4 px-3 gap-5'>
              <Input icon={Search} placeholder='Search' className='ps-9' />
              <CreateConversationModal />
            </div>
            <ConversationSidebar
              conversations={conversationsData}
              isConversationsLoading={isConversationsLoading}
            />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
