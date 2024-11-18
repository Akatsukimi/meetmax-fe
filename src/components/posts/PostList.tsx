"use client";

import { Loader } from "lucide-react";
import toast from "react-hot-toast";
import { useEffect } from "react";
import PostCard from "./PostCard";
import useFetchPosts from "@/app/hooks/useFetchPosts";
import { useAuth } from "@/providers/auth-provider";
import { useInView } from "react-intersection-observer";

const PostList = () => {
  const { user } = useAuth();
  const {
    data: posts,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useFetchPosts({ user });
  const { ref, inView } = useInView();

  useEffect(() => {
    if (error) {
      toast.error("Error loading posts");
    }
  }, [error]);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      void fetchNextPage();
    }
  }, [fetchNextPage, inView, hasNextPage, isFetchingNextPage]);

  if (isLoading && !posts) {
    return (
      <div className="flex justify-center items-center h-full w-full">
        <Loader size="48" />
      </div>
    );
  }

  return (
    <div className="space-y-8 my-7">
      {posts?.pages.map((page) =>
        page.data.map((post) => (
          <PostCard key={post.id} post={post} user={user} />
        ))
      )}

      {hasNextPage && (
        <div ref={ref} className="flex justify-center items-center">
          <Loader size="48" />
        </div>
      )}
    </div>
  );
};

export default PostList;
