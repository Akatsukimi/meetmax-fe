"use client";

import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import PostCard from "./PostCard";
import useFetchPosts from "@/app/hooks/useFetchPosts";

const PostList = () => {
  const { data: posts, isLoading, error } = useFetchPosts();

  useEffect(() => {
    if (error) {
      toast.error("Error loading posts");
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 my-7">
      {posts?.map((post) => (
        <PostCard key={post.id} post={post} className="" />
      ))}
    </div>
  );
};

export default PostList;
