"use client";

import Friends from "./friends";
import Stories from "./stories";
import SearchFriend from "./search-friend";
import {usePathname} from "next/navigation";

interface IRightBarProps {
    className?: string;
}

const RightBar = ({className}: IRightBarProps) => {
    const pathname = usePathname();
    const showRightBar = pathname === "/" || pathname === "/communities";
    if (!showRightBar) return null;

    return (
        <div className={className}>
            <SearchFriend/>
            <Stories/>
            <Friends/>
        </div>
    );
};

export default RightBar;
