'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { Button } from '../ui/button';
import CreateGroupForm from '@/components/forms/create-group-form';
// import InputWithUsersAndTitle from '../forms/create-group-form-v2';

const CreateGroupModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={() => setIsOpen(!isOpen)}>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg bg-background border">
        <DialogHeader className="flex flex-row items-center justify-between mb-2">
          <DialogTitle>Create a group</DialogTitle>
        </DialogHeader>
        <div className="flex items-center justify-center">
          <CreateGroupForm setIsOpen={setIsOpen} />
          {/*<InputWithUsersAndTitle></InputWithUsersAndTitle>*/}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateGroupModal;
