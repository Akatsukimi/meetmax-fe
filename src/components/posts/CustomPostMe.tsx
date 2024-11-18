import {
  Pin,
  Save,
  Edit,
  BellOff,
  Globe,
  Calendar,
  Trash,
  Ellipsis,
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
import useDeletePost from "@/app/hooks/useDeletePost";
import { Post } from "@/lib/types";

export default function CustomPostMe({ post }: { post: Post }) {
  const { mutate: handleDelete } = useDeletePost(post.id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="ml-auto" variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="">
        {/* Actions Group */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Pin />
            <span>Pin post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Save />
            <span>Save post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Edit and Audience Group */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Edit />
            <span>Edit post</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Globe />
            <span>Edit audience</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Notification Settings */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BellOff />
            <span>Turn off notifications for this post</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        {/* Archive and Trash */}
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Calendar />
            <span>Edit date</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => handleDelete(post.id)}
            className="cursor-pointer"
          >
            <Trash />
            <div className="flex flex-col">
              <span>Delete post permanently</span>
              <span className="text-xs text-muted-foreground">
                This action cannot be undone
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
