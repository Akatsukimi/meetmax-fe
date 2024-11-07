"use client";

import { getPosts } from "@/services/posts";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import Post from "./Post";

const PostList = () => {
  const {
    data: posts,
    error,
    isLoading: postLoading,
  } = useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });

  useEffect(() => {
    if (error) {
      toast.error("Error loading posts");
    }
  }, [error]);

  if (postLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-8 my-7">
      {posts?.map((post) => (
        // eslint-disable-next-line react/jsx-key -- key is provided by Post component
        <Post post={post} className="" />
      ))}
    </div>
  );
};

export default PostList;
