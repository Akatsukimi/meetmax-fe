"use client";

import React, { useState } from "react";
import { ChevronsUpDown, Ellipsis } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { Button } from "../ui/button";

const OtherCollapsible = () => {
  const [isOpenCollapseOther, setIsOpenCollapseOther] = useState(false);
  return (
    <Collapsible
      open={isOpenCollapseOther}
      onOpenChange={setIsOpenCollapseOther}
      className='w-full space-y-2'
    >
      <CollapsibleTrigger asChild>
        <Button
          variant='ghost'
          className='w-full pl-0 pr-2 flex items-center justify-between bg-transparent overflow-hidden'
        >
          <div className='flex items-center gap-4.5 rounded-md'>
            <span className='bg-background p-3'>
              <Ellipsis />
            </span>
            <div className='flex items-start flex-col'>
              <span className='text-sm'>Other</span>
              <span className='text-xs text-foreground/50'>
                62 files, 136MB
              </span>
            </div>
          </div>
          <ChevronsUpDown className='h-4 w-4' />
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent className='space-y-2'>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>
          @radix-ui/colors
        </div>
        <div className='rounded-md border px-4 py-3 font-mono text-sm'>
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default OtherCollapsible;
