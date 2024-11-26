import axiosInstance from '@/lib/axiosInstance';
import { FileType } from '@/lib/enum';

export type UploadFileBody = {
  files: File[];
  type: FileType;
};

export type UploadFileResponse = {
  id: string;
  name: string;
  url: string;
  mimetype: string;
}[];

export const uploadMultipleFiles = async (
  body: UploadFileBody,
): Promise<UploadFileResponse> => {
  const formData = new FormData();
  body.files.forEach((file) => {
    formData.append('files', file);
  });
  formData.append('type', body.type);

  const response = await axiosInstance.post('/api/files/multiple', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
