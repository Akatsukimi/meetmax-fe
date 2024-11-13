import axiosInstance from "@/lib/axiosInstance";
import { Comment, LikedPostUser, Post } from "@/lib/types";
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

export const likePost = async (postId: string): Promise<Post> => {
  const response = await axiosInstance.post(`/api/like/toggle-like/${postId}`);
  return response.data;
};

export const getUsersLikedPost = async (
  postId: string,
  page: number,
  limit: number
): Promise<{
  data: LikedPostUser[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const response = await axiosInstance.get(`/api/like/post/${postId}`, {
    params: { page, limit },
  });
  return response.data;
};

export const getCommentsPost = async (
  postId: string,
  parentCommentId: string | null,
  page: number,
  limit: number
): Promise<{
  data: Comment[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> => {
  const response = await axiosInstance.get(`/api/comment/post/${postId}`, {
    params: { parentCommentId, page, limit },
  });
  return response.data;
};

export const createComment = async (
  postId: string,
  body: { content: string; parentCommentId: string | null }
): Promise<Comment> => {
  const response = await axiosInstance.post(
    `/api/comment/create/${postId}`,
    body
  );
  return response.data;
};
