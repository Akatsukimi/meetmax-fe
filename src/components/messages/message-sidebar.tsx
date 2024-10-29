import { Plus, Search } from "lucide-react";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const MessageSidebar = () => {
  return (
    <div className='p-5 bg-background rounded-xl w-[364px] flex flex-col gap-5 h-full'>
      <div className='flex items-center justify-between gap-x-5 w-full'>
        <Input icon={Search} className='w-full ps-10' placeholder='Search' />
        <Button variant='ghost' className='bg-gray-50'>
          <Plus />
        </Button>
      </div>
      <ScrollArea className='flex-1 overflow-auto h-[500px]'>
        <div className='flex flex-col h-full'>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
          <div>test</div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default MessageSidebar;
