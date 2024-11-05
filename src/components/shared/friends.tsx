import { Ellipsis } from "lucide-react";

import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

const Friends = () => {
  return (
    <div className='flex h-full flex-col gap-5'>
      <div className='flex items-center justify-between'>
        <span>Friends</span>
        <Button size='icon' variant='ghost'>
          <Ellipsis />
        </Button>
      </div>
      <ScrollArea className='flex-1 overflow-y-auto'>
        <div className='flex flex-col gap-5'>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
          <span>test</span>
        </div>
      </ScrollArea>
      <div>test345324534</div>
    </div>
  );
};

export default Friends;
