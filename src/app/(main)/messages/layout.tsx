import ConversationSidebar from "@/components/conversations/conversation-sidebar";
import CreateConversationModal from "@/components/modals/create-conversation-modal";
import {Input} from "@/components/ui/input";
import {Search} from "lucide-react";

const MainLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    return (
        <div className='flex flex-grow'>
            <div className='bg-gray-50 p-7.5  rounded-t-2xl flex-1'>
                <div className='flex h-full gap-x-7.5'>
                    <div className='flex flex-col h-full w-[340px] bg-background rounded-lg overflow-hidden'>
                        <div className='flex w-full items-center justify-between py-4 px-3 gap-5'>
                            <Input icon={Search} placeholder='Search' className='ps-9'/>
                            <CreateConversationModal/>
                        </div>
                        <ConversationSidebar/>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default MainLayout;
