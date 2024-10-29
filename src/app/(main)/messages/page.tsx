import MessageSidebar from "@/components/messages/message-sidebar";

const MessagesPage = () => {
  return (
    <div className='flex gap-7.5 h-full'>
      <MessageSidebar />
      <div className='flex-1'>main</div>
    </div>
  );
};

export default MessagesPage;
