"use client";

import { FC } from "react";

import { ConversationType } from "@/lib/types";

import { ScrollArea } from "../ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type Props = {
  conversations: ConversationType[];
};

const ConversationSidebar: FC<Props> = () => {
  return (
    <ScrollArea className='flex-1 overflow-auto'>
      {Array.from({ length: 40 }).map((_, index) => (
        <div key={index}>
          <div className='flex p-3 transition-all rounded-md cursor-pointer hover:bg-gray-100 gap-2.5 items-center'>
            <Avatar>
              <AvatarImage src='https://github.com/shadcn.png' />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className='flex flex-col w-full'>
              <p className='font-bold'>username</p>
              <div className='flex items-center justify-between'>
                <p className='text-sm font-normal text-foreground/60'>
                  content
                </p>
                <p className='text-sm font-normal text-foreground/60'>time</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </ScrollArea>
  );
};

export default ConversationSidebar;
