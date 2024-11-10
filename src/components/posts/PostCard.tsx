import type { Post } from "@/lib/types";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { format, formatDistanceToNow } from "date-fns";
import { VisibilityIcons } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Ellipsis, Heart, MessageCircleMore, Share2 } from "lucide-react";
import { cn } from "@/lib/utils";
import AttachmentGallery from "./AttachmentGallery";

interface PostCardProps {
  post: Post;
  className: string;
}

const PostCard = ({ post, className }: PostCardProps) => {
  console.log("🚀 ~ PostCard ~ post:", post);
  return (
    <article
      key={post.id}
      className={cn(
        "p-4 rounded-lg bg-white shadow-sm flex flex-col gap-5",
        className
      )}
    >
      <div className="flex gap-4">
        <Image
          src={post?.author?.avatar || avatar}
          alt="avatar"
          width={50}
          height={50}
          className="rounded-full"
        />

        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-medium text-base text-secondary-foreground">
              {post?.author?.username}
            </h3>
            <div className="flex gap-1 items-center">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-gray-500">
                      {formatDistanceToNow(new Date(post.createdAt), {
                        addSuffix: true,
                      }).replace("about ", "")}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {format(
                      new Date(post.createdAt),
                      "EEEE, MMMM do, yyyy 'at' h:mm a"
                    )}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>

              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="text-xs text-gray-500">
                      {VisibilityIcons[post.visibility]}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent className="text-xs">
                    {post.visibility}
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </div>

        <Button className="ml-auto" variant="ghost" size="icon">
          <Ellipsis />
        </Button>
      </div>

      <div className="flex-1">
        <div
          className="text-gray-700 text-sm font-normal mb-3"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {post.files && <AttachmentGallery attachments={post.files} />}

        <div className="mt-4.5 space-y-3.5">
          <div className="flex items-center text-gray-500 text-sm">
            <span className="mr-2">
              {post.likes?.length > 0 && (
                <>
                  <strong>{post.likes[0].username}</strong>
                  {post.likes.length > 1 && (
                    <strong> and {post.likes.length - 1} others</strong>
                  )}
                </>
              )}
            </span>
            <div className="ml-auto">
              {/* {post.comments.length} comments • {post.shares.length} shares */}
              10 comments • 5 shares
            </div>
          </div>

          <Separator />

          <div className="flex justify-between">
            <Button variant="ghost">
              <Heart />
              Like
            </Button>
            <Button variant="ghost">
              <MessageCircleMore />
              Comment
            </Button>
            <Button variant="ghost">
              <Share2 />
              Share
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
