import axios from "axios";

import axiosInstance from "@/lib/axiosInstance";

axios.defaults.withCredentials = true;

export const login = async (data: { email: string; password: string }) => {
  return await axios.post("http://localhost:8000/api/auth/login", data);
};

export const signup = async (data: {
  email: string;
  password: string;
  username: string;
  birthday: Date;
  gender: string;
}) => {
  return await axios.post("http://localhost:8000/api/auth/signup", data);
};

export const refreshToken = async () => {
  return await axiosInstance.post("http://localhost:8000/api/auth/refresh");
};

export const handleLogout = async () => {
  return await axiosInstance.post("http://localhost:8000/api/auth/logout");
};
