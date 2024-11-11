import { useQuery } from "@tanstack/react-query";
import { getPosts } from "@/services/posts";
import { Post, User } from "@/lib/types";

const useFetchPosts = ({ user }: { user: User | null }) => {
  return useQuery<Post[]>({
    queryKey: [`posts:${user?.id}`],
    queryFn: getPosts,
    staleTime: Infinity,
  });
};

export default useFetchPosts;
