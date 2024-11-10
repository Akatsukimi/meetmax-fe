import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "@/services/posts";
import { Post } from "@/lib/types";
import toast from "react-hot-toast";

const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });
      const previousPosts = queryClient.getQueryData<Post[]>(["posts"]);
      return { previousPosts };
    },
    onError: (error, _, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
      toast.error(`Create post failed: ${error}`);
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["posts"], (old: Post[] = []) => [...old, data]);
      toast.success("Post created successfully");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
};

export default useCreatePost;
