import React from "react";

import {
  Bell,
  Earth,
  LayoutGrid,
  LogOut,
  MessageSquareDot,
  Settings,
  User,
  UsersRound,
  Globe,
  Users,
  Lock,
} from "lucide-react";

export const BACKEND_URL = process.env.BACKEND_URL;
export const SOCKET_URL = process.env.SOCKET_URL;

export const MenuBar = [
  {
    href: "/",
    icon: LayoutGrid,
    label: "Feed",
    title: "Home",
  },
  {
    href: "/communities",
    icon: UsersRound,
    label: "My communities",
    title: "My communities",
  },
  {
    href: "/messages",
    icon: MessageSquareDot,
    label: "Messages",
    title: "Messages",
  },
  {
    href: "/notifications",
    icon: Bell,
    label: "Notifications",
    title: "Notifications",
  },
  {
    href: "/explore",
    icon: Earth,
    label: "Explore",
    title: "Explore",
  },
  {
    href: "/profile",
    icon: User,
    label: "Profile",
    title: "Profile",
  },
  {
    href: "/settings",
    icon: Settings,
    label: "Settings",
    title: "Settings",
  },
  {
    href: "/logout",
    icon: LogOut,
    label: "Logout",
    title: "Logout",
  },
];

export const VisibilityIcons: {
  [key: string]: JSX.Element;
} = {
  public: React.createElement(Globe, { className: "text-gray-500", size: 14 }),
  friends: React.createElement(Users, { className: "text-gray-500", size: 14 }),
  onlyMe: React.createElement(Lock, { className: "text-gray-500", size: 14 }),
};
