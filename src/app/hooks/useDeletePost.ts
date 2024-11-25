import { QueryKeyFeed } from "@/lib/enum";
import { ErrorServerResponse, Post } from "@/lib/types";
import { useAuth } from "@/providers/auth-provider";
import { deletePost } from "@/services/posts";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useDeletePost(postId: string) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      queryClient.setQueryData<Post[]>(
        [`${QueryKeyFeed.Posts}:${user?.id}`],
        (old) => old?.filter((post) => post.id !== postId)
      );
      toast.success("Post deleted successfully");
      queryClient.invalidateQueries({
        queryKey: [`${QueryKeyFeed.Posts}:${user?.id}`],
      });
    },
    onError: (error: ErrorServerResponse) => {
      toast.error(`Delete post failed: ${error.response.data.message[0]}`);
    },
  });
}
