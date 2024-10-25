import Link from "next/link";
import SearchField from "./search-field";
import getSession from "@/lib/getSession";
import Image from "next/image";
import Logo from "@/assets/logo.png";
import { Button } from "../ui/button";
import { MessageSquareDot } from "lucide-react";

const Navbar = () => {
  const user = getSession();

  return (
    <header className='sticky top-0 z-10 bg-background'>
      <div className='mx-auto flex w-full items-center justify-between gap-5 px-5 py-4'>
        <Link href='/' className='gap-2.5 items-center hidden sm:flex'>
          <Image
            src={Logo}
            width={26}
            height={26}
            alt='logo'
            className='object-cover'
          />
          <h1 className='font-bold text-lg'>Meetmax</h1>
        </Link>
        <div className='block sm:hidden'>
          <Image
            src={Logo}
            width={42}
            height={42}
            alt='logo'
            className='object-cover rounded overflow-hidden'
          />
        </div>
        <SearchField />
        <Button size='icon' variant='ghost' asChild>
          <Link href='/messages' className='block sm:hidden'>
            <MessageSquareDot />
          </Link>
        </Button>
        <div className='hidden sm:flex items-center gap-5'>
          <span>{user?.username}</span>
          <Image
            src={Logo}
            width={42}
            height={42}
            alt='logo'
            className='object-cover rounded overflow-hidden flex-shrink'
          />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
