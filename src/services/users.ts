import axiosInstance from '@/lib/axiosInstance';
import { User, UserProfile } from '@/lib/types';

export const getUsers = async () => {
  const response = await axiosInstance.get('/api/users');
  return response.data;
};

export const uploadAvatar = async (
  file: File,
): Promise<Pick<User, 'avatar'>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(
    `/api/users/upload-avatar`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const uploadCoverPhoto = async (
  file: File,
): Promise<Pick<UserProfile, 'coverPhoto'>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axiosInstance.post(
    `/api/users/upload-coverPhoto`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
  return response.data;
};

export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await axiosInstance.get('/api/users/profile');
  return response.data;
};
