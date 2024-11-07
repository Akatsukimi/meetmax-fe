"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { MenuBar } from "@/lib/constants";
import { handleLogout } from "@/services/auth";
import { useSocket } from "@/providers/socket-provider";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "@/providers/auth-provider";

interface MenubarProps {
  className?: string;
}

const Menubar = ({ className }: MenubarProps) => {
  const router = useRouter();
  const socket = useSocket();
  const pathname = usePathname();
  const queryClient = useQueryClient();
  const { updateAuthUser } = useAuth();

  const isActive = (basePath: string) => {
    if (basePath === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(basePath);
  };

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      socket?.disconnect();
      queryClient.clear();
      updateAuthUser(null);
      localStorage.removeItem("user");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return (
    <div className={className}>
      {MenuBar.map((item) => {
        const Icon = item.icon;

        // Check if the current item is the logout button
        if (item.href === "/logout") {
          return (
            <Button
              key={item.href}
              variant='ghost'
              className={cn(
                "flex items-center justify-start gap-5 px-5 py-3 w-full",
                isActive(item.href) &&
                  "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
              )}
              title={item.title}
              onClick={handleLogoutClick}
            >
              <Icon />
              <span className='hidden lg:inline'>{item.label}</span>
            </Button>
          );
        }

        // Render normal buttons for other menu items
        return (
          <Button
            key={item.href}
            variant='ghost'
            className={cn(
              "flex items-center justify-start gap-5 px-5 py-3",
              isActive(item.href) &&
                "bg-gray-800 text-background hover:bg-gray-800 hover:text-background"
            )}
            title={item.title}
            asChild
          >
            <Link href={item.href}>
              <Icon />
              <span className='hidden lg:inline'>{item.label}</span>
            </Link>
          </Button>
        );
      })}
    </div>
  );
};

export default Menubar;
