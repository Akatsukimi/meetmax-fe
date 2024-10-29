import axiosInstance from "@/lib/axiosInstance";

export const getUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};

export const getConversations = async () => {
  const response = await axiosInstance.get("/api/conversations");
  return response.data;
};
