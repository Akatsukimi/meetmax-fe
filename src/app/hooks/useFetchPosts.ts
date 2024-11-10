import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";
import { Post } from "@/lib/types";

const useFetchPosts = () => {
  return useQuery<Post[]>({
    queryKey: ["posts"],
    queryFn: getPosts,
    staleTime: Infinity,
  });
};

export default useFetchPosts;
