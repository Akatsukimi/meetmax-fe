import { QueryKeyFeed } from "@/lib/enum";
import { Comment } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { createComment } from "@/services/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateComment = (
  postId: string,
  body: { content: string; parentCommentId: string | null }
) => {
  const { user } = useAuth();
  if (!user) {
    throw new Error("User is not authenticated");
  }
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => createComment(postId, body),
    onMutate: async () => {
      await queryClient.cancelQueries({
        queryKey: [QueryKeyFeed.CommentsPost, postId],
      });

      const previousComments = queryClient.getQueryData<Comment[]>([
        QueryKeyFeed.CommentsPost,
        postId,
      ]);

      queryClient.setQueryData<Comment[]>(
        [QueryKeyFeed.CommentsPost, postId],
        (oldComments: Comment[] = []) => [
          ...oldComments,
          {
            id: Date.now().toString(),
            postId,
            content: body.content,
            user: {
              id: Date.now().toString(),
              username: user.username,
              avatar: null,
            },
            parentCommentId: body.parentCommentId,
            updatedAt: new Date().toISOString(),
          } as Comment,
        ]
      );

      return { previousComments };
    },
    onError: (_error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          [QueryKeyFeed.CommentsPost, postId],
          context.previousComments
        );
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QueryKeyFeed.CommentsPost, postId],
      });
    },
  });
};

export default useCreateComment;
