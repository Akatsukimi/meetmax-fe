"use client";

import {
  Bell,
  Earth,
  LayoutGrid,
  MessageSquareDot,
  Settings,
  User,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface MenubarProps {
  className?: string;
}

const Menubar = ({ className }: MenubarProps) => {
  const pathname = usePathname();
  const isActive = (basePath: string) => {
    if (basePath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(basePath);
  };

  return (
    <div className={className}>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Home'
        asChild
      >
        <Link href='/'>
          <LayoutGrid />
          <span className='hidden lg:inline'>Feed</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/communities") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='My communities'
        asChild
      >
        <Link href='/communities'>
          <UsersRound />
          <span className='hidden lg:inline'>My communities</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/messages") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Messages'
        asChild
      >
        <Link href='/messages'>
          <MessageSquareDot />
          <span className='hidden lg:inline'>Messages</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/notifications") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Notifications'
        asChild
      >
        <Link href='/notifications'>
          <Bell />
          <span className='hidden lg:inline'>Notifications</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/explore") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Explore'
        asChild
      >
        <Link href='/explore'>
          <Earth />
          <span className='hidden lg:inline'>Explore</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/profile") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Profile'
        asChild
      >
        <Link href='/profile'>
          <User />
          <span className='hidden lg:inline'>Profile</span>
        </Link>
      </Button>
      <Button
        variant='ghost'
        className={cn(
          "flex items-center justify-start gap-5 py-3 px-5",
          isActive("/settings") &&
            "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
        )}
        title='Settings'
        asChild
      >
        <Link href='/settings'>
          <Settings />
          <span className='hidden lg:inline'>Settings</span>
        </Link>
      </Button>
    </div>
  );
};

export default Menubar;
