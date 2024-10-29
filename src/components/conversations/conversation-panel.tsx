import React from "react";

import { Separator } from "../ui/separator";
import { ScrollArea } from "../ui/scroll-area";
import MessageEditor from "../messages/message-editor";
import ConversationHeader from "./conversation-header";

const ConversationPanel = () => {
  return (
    <div className='flex-grow bg-background rounded-lg flex flex-col overflow-hidden'>
      <ConversationHeader />
      <Separator />
      <ScrollArea className='flex-1 px-4.5 py-2'>
        <div className=''>
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}>chat message</div>
          ))}
        </div>
      </ScrollArea>
      <Separator />
      <div className='p-5'>
        <MessageEditor />
      </div>
    </div>
  );
};

export default ConversationPanel;
