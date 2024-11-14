import { QueryKeyFeed } from "@/lib/enum";
import { Post } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { likePost } from "@/services/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useLikePost = (postId: string) => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => likePost(postId),
    onMutate: async () => {
      // Cancel any ongoing fetches for the post to avoid conflicts
      await queryClient.cancelQueries({
        queryKey: [`${QueryKeyFeed.Posts}:${user.id}`],
      });

      // Take a snapshot of the previous post data for rollback if needed
      const previousPosts = queryClient.getQueryData<Post[]>([
        `${QueryKeyFeed.Posts}:${user.id}`,
      ]);

      // Optimistically update the like status in the cache
      queryClient.setQueryData<Post[]>(
        [`${QueryKeyFeed.Posts}:${user.id}`],
        (oldPosts: Post[] = []) =>
          oldPosts.map((post) =>
            post.id === postId
              ? {
                  ...post,
                  likes: post.likes.some((like) => like.userId === user.id)
                    ? post.likes.filter((like) => like.userId !== user.id) // Unlike
                    : [
                        ...post.likes,
                        {
                          id: Date.now().toString(),
                          userId: user.id,
                          username: user.username,
                          avatar: user.avatar ?? null,
                          updatedAt: new Date().toISOString(),
                        },
                      ], // Like
                }
              : post
          )
      );

      // Return rollback context if mutation fails
      return { previousPosts };
    },
    onError: (_error, _variables, context) => {
      // Roll back to previous state if there’s an error
      if (context?.previousPosts) {
        queryClient.setQueryData(
          [`${QueryKeyFeed.Posts}:${user.id}`],
          context.previousPosts
        );
      }
    },
    onSettled: () => {
      // Refetch posts to sync with server data
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeyFeed.Posts}:${user.id}`],
      });
    },
  });
};

export default useLikePost;
