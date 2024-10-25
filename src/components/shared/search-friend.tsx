"use client";

import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { Input } from "../ui/input";

const SearchFriend = () => {
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const q = (form.q as HTMLInputElement).value.trim();
    if (!q) return;
  };

  return (
    <form onSubmit={handleSubmit} method='GET'>
      <div className='relative w-full'>
        <Input name='q' placeholder='Search' className='pe-10' />
        <SearchIcon className='absolute right-3 top-1/2 size-5 -translate-y-1/2 transform text-muted-foreground' />
      </div>
    </form>
  );
};

export default SearchFriend;
