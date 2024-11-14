import axiosInstance from "@/lib/axiosInstance";
import { FileType } from "@/lib/enum";

export type UploadFileBody = {
  file: File;
  type: FileType;
};

export type UploadFileResponse = {
  id: string;
  url: string;
};

export type UploadMultipleFilesBody = {
  files: File[];
  type: FileType;
};

export type UploadMultipleFilesResponse = {
  id: string;
  url: string;
}[];

export const uploadFile = async (
  body: UploadFileBody
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  formData.append("file", body.file);
  formData.append("type", body.type);

  const response = await axiosInstance.post("/api/file/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const uploadMultipleFiles = async (
  body: UploadMultipleFilesBody
): Promise<UploadMultipleFilesResponse> => {
  const formData = new FormData();
  body.files.forEach((file) => {
    formData.append("file", file);
  });
  formData.append("type", body.type);

  const response = await axiosInstance.post(
    "/api/file/multiple-upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
