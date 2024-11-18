import {
  Ellipsis,
  CirclePlus,
  CircleMinus,
  Save,
  BellIcon,
  BookX,
  MessageSquareWarning,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Post } from "@/lib/types";

export default function CustomPost({ post }: { post: Post }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto" variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {/* Interested */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <CirclePlus />
            <div className="flex flex-col">
              <span>Interested</span>
              <span className="text-xs text-muted-foreground">
                More of your posts will be like this
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CircleMinus />
            <div className="flex flex-col">
              <span>Not interested</span>
              <span className="text-xs text-muted-foreground">
                Less of your posts will be like this
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Save />
            <div className="flex flex-col">
              <span>Save post</span>
              <span className="text-xs text-muted-foreground">
                Add this to your saved items
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BellIcon />
            <span>Turn on notifications for this post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BookX />
            <div className="flex flex-col">
              <span>Unfollow {post.author.username}</span>
              <span className="text-xs text-muted-foreground">
                Stop seeing posts from {post.author.username}
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <MessageSquareWarning />
            <div className="flex flex-col">
              <span>Report post</span>
              <span className="text-xs text-muted-foreground">
                We won&apos;t let {post.author.username} know who reported this
              </span>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserX />
            <div className="flex flex-col">
              <span>Block {post.author.username}&apos;s profile</span>
              <span className="text-xs text-muted-foreground">
                You won&apos;t be able to see or contact {post.author.username}
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
