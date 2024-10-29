import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import ConversationPanel from "@/components/conversations/conversation-panel";
import ConversationSidebar from "@/components/conversations/conversation-sidebar";
import CreateConversationModal from "@/components/modals/create-conversation-modal";

const MessagesPage = () => {
  return (
    <div className='flex h-full gap-x-7.5'>
      <div className='flex flex-col h-full w-[340px] bg-background rounded-lg overflow-hidden'>
        <div className='flex w-full items-center justify-between py-4 px-3 gap-5'>
          <Input icon={Search} placeholder='Search' className='ps-9' />
          <CreateConversationModal />
        </div>
        <ConversationSidebar conversations={[]} />
      </div>
      <ConversationPanel />
    </div>
  );
};

export default MessagesPage;
