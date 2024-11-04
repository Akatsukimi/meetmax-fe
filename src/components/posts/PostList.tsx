"use client";

import { Post } from "@/lib/types";
import { getPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import {
  Ellipsis,
  Globe,
  Heart,
  Lock,
  MessageCircleMore,
  Share2,
  Users,
} from "lucide-react";
import Image from "next/image";
import avatar from "@/assets/avatar.png";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const visibilityIcons: {
  [key: string]: JSX.Element;
} = {
  public: <Globe className="text-gray-500" size={14} />,
  friends: <Users className="text-gray-500" size={14} />,
  onlyMe: <Lock className="text-gray-500" size={14} />,
};

const PostList = () => {
  const {
    data: posts,
    error,
    isLoading: queryLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
  });

  if (queryLoading) {
    return <div className="text-center mt-5">Loading posts...</div>;
  }

  if (error) {
    return (
      <div className="text-center text-red-500 mt-5">Error loading posts</div>
    );
  }

  return (
    <div className="space-y-8 my-7">
      {posts?.map((post) => (
        <div
          key={post.id}
          className="p-4 rounded-lg bg-white shadow-sm flex flex-col gap-5"
        >
          <div className="flex gap-4">
            <Image
              src={post.author.avatar || avatar}
              alt="avatar"
              width={50}
              height={50}
              className="rounded-full"
            />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-base text-secondary-foreground">
                  {post.author.username}
                </h3>
                <div className="flex gap-1 items-center">
                  <span className="text-xs text-gray-500">
                    {formatDistanceToNow(new Date(post.createdAt), {
                      addSuffix: true,
                    })}
                  </span>
                  <span>{visibilityIcons[post.visibility]}</span>
                </div>
              </div>
            </div>

            <Button className="ml-auto" variant="ghost" size="icon">
              <Ellipsis />
            </Button>
          </div>

          <div className="flex-1">
            <div
              className="text-gray-700 text-sm font-normal"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {!post.image && (
              <div className="mt-4">
                <Image
                  src={
                    post.image ||
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR984ENUg3jFKTnwKqXQ1kG90NqiWSKxEwAfg&s"
                  }
                  alt="post image"
                  width={476}
                  height={268}
                  className="rounded-lg aspect-auto object-contain"
                />
              </div>
            )}

            <div className="mt-4.5 space-y-3.5">
              <div className="h-[22px] bg-gray-300">
                count like, comment, share
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
        </div>
      ))}
    </div>
  );
};

export default PostList;
