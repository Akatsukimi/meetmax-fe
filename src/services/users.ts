import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/lib/types";

export const getUsers = async () => {
  const response = await axiosInstance.get("/api/users");
  return response.data;
};

export const uploadAvatar = async (
  userId: string,
  file: File
): Promise<User> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosInstance.post(
    `/api/users/${userId}/upload-avatar`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
