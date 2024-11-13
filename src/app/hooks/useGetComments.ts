import { QueryKeyFeed } from "@/lib/enum";
import { getCommentsPost } from "@/services/posts";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetComments = (postId: string, parentCommentId: string | null) => {
  return useInfiniteQuery({
    queryKey: [QueryKeyFeed.CommentsPost, postId, parentCommentId],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getCommentsPost(
        postId,
        parentCommentId,
        pageParam as number,
        10
      );
      return response;
    },
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
    },
    initialPageParam: 1,
  });
};

export default useGetComments;
