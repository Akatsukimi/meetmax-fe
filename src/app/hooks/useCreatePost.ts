import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/posts";
import { Post } from "@/lib/types";
import toast from "react-hot-toast";
import { useAuth } from "@/providers/auth-provider";

const useCreatePost = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [`posts:${user?.id}`] });
      const previousPosts = queryClient.getQueryData<Post[]>([
        `posts:${user?.id}`,
      ]);
      return { previousPosts };
    },
    onError: (error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData([`posts:${user?.id}`], context.previousPosts);
      }
      toast.error(`Create post failed: ${error}`);
    },
    onSuccess: (data) => {
      queryClient.setQueryData([`posts:${user?.id}`], (old: Post[] = []) => [
        ...old,
        data,
      ]);
      toast.success("Post created successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: [`posts:${user?.id}`] });
    },
  });
};

export default useCreatePost;
