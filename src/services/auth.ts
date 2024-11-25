import axios from "axios";

import axiosInstance from "@/lib/axiosInstance";
import { User } from "@/lib/types";

axios.defaults.withCredentials = true;

export const login = async (data: { email: string; password: string }) => {
  return await axios.post("http://localhost:8000/api/auth/login", data);
};

export const signup = async (data: {
  email: string;
  password: string;
  username: string;
  birthday: string;
  gender: string;
}): Promise<User> => {
  return await axios.post("http://localhost:8000/api/auth/signup", data);
};

export const refreshToken = async () => {
  return await axiosInstance.post("http://localhost:8000/api/auth/refresh");
};

export const handleLogout = async () => {
  return await axiosInstance.post("http://localhost:8000/api/auth/logout");
};

export const getProfile = async (): Promise<User> => {
  const response = await axiosInstance.get(
    "http://localhost:8000/api/auth/profile"
  );
  return response.data;
};
