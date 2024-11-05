import axiosInstance from "@/lib/axiosInstance";
import { Post } from "@/lib/types";
import { createPostSchema } from "@/lib/validation";
import { z } from "zod";

export const createPost = async (
  data: z.infer<typeof createPostSchema>
): Promise<Post> => {
  const response = await axiosInstance.post("/api/posts/create", data);
  return response.data;
};

export const getPosts = async (): Promise<Post[]> => {
  const response = await axiosInstance.get("/api/posts");
  return response.data;
};
