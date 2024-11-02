"use client";

import Friends from "./friends";
import Stories from "./stories";
import SearchFriend from "./search-friend";
import { usePathname } from "next/navigation";

const RightBar = () => {
  const pathname = usePathname();
  const showRightBar = pathname === "/" || pathname === "/communities";
  if (!showRightBar) return null;

  return (
    <div className='flex-1 max-w-[280px] '>
      <SearchFriend />
      <Stories />
      <Friends />
    </div>
  );
};

export default RightBar;
