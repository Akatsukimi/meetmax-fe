"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "../ui/button";
import CreateConversationForm from "../forms/CreateConversationForm";

const CreateConversationModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant='ghost'>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-lg bg-background border'>
        <DialogHeader className='flex flex-row items-center justify-between mb-2'>
          <DialogTitle>Create a conversation</DialogTitle>
        </DialogHeader>
        <div className='flex items-center justify-center'>
          <CreateConversationForm setIsOpen={setIsOpen} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateConversationModal;
