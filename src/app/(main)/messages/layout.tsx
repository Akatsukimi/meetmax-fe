"use client";

import ConversationSidebar from "@/components/conversations/conversation-sidebar";
import CreateConversationModal from "@/components/modals/create-conversation-modal";
import {Input} from "@/components/ui/input";
import {fetchConversationsThunk} from "@/lib/features/conversations/conversationSlice";
import {AppDispatch} from "@/lib/store";
import {Search} from "lucide-react";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {useSocket} from "@/providers/socket-provider";


const MainLayout = ({
                        children,
                    }: Readonly<{
    children: React.ReactNode;
}>) => {
    const dispatch = useDispatch<AppDispatch>();
    const socket = useSocket();

    useEffect(() => {
        dispatch(fetchConversationsThunk())
    }, [dispatch]);

    useEffect(() => {
        // socket.on('onMessage', (payload: MessageEventPayload) => {
        //     console.log("Message received", payload)
        //     dispatch(addMessage(payload))
        //     dispatch(updateConversation(payload.conversation))
        // })
    }, []);

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
