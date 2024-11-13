import { CreateGroupParams, Group } from "@/lib/types";
import axiosInstance from "@/lib/axiosInstance";

export const getGroups = async (): Promise<Group[]> => {
  const response = await axiosInstance.get("/api/groups");
  return response.data;
};

export const createGroup = async (
  params: CreateGroupParams
): Promise<Group> => {
  const response = await axiosInstance.post("/api/groups", params);
  return response.data;
};

export const getGroupMessages = async (groupId: string) => {
  const response = await axiosInstance.get(`/api/groups/${groupId}/messages`);
  return response.data;
};

export const createGroupMessage = async ({
  groupId,
  content,
}: {
  groupId: string;
  content: string;
}) => {
  const response = await axiosInstance.post(`/api/groups/${groupId}/messages`, {
    content,
  });
  return response.data;
};

export const deleteGroupMessage = async ({
  groupId,
  messageId,
}: {
  groupId: string;
  messageId: string;
}) => {
  const response = await axiosInstance.delete(
    `/api/groups/${groupId}/messages/${messageId}`
  );
  return response.data;
};
