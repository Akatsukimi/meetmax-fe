import { getPosts } from "@/services/posts";
import { User } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";
import { QueryKeyFeed } from "@/lib/enum";

const useFetchPosts = ({ user }: { user: User | null }) => {
  return useInfiniteQuery({
    queryKey: [`${QueryKeyFeed.Posts}:${user?.id}`, user?.id],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getPosts(pageParam, 10);
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
    },
    initialPageParam: 1,
    enabled: !!user,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useFetchPosts;
