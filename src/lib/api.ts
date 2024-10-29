import axios, { AxiosRequestConfig } from "axios";
import {
  User,
  CreateUserParams,
  ConversationType,
  CreateMessageParams,
  UserCredentialsParams,
  CreateConversationParams,
} from "./types";
import { BACKEND_URL } from "./constants";
import axiosInstance from "./axiosInstance";

// const API_URL = BACKEND_URL;
const config: AxiosRequestConfig = { withCredentials: true };

export const postRegisterUser = (data: CreateUserParams) =>
  axios.post(`${BACKEND_URL}/auth/register`, data, config);

export const postLoginUser = (data: UserCredentialsParams) =>
  axios.post(`${BACKEND_URL}/auth/login`, data, config);

export const getAuthUser = () =>
  axiosInstance.get<User>(`${BACKEND_URL}/auth/status`, config);

// export const getConversations = () =>
//   axios.get<ConversationType[]>(`${BACKEND_URL}/api/conversations`, config);

export const getConversationMessages = (id: number) =>
  axiosInstance.get(`${BACKEND_URL}/messages/${id}`, config);

export const postNewMessage = (data: CreateMessageParams) =>
  axiosInstance.post(`${BACKEND_URL}/messages`, data, config);

export const postNewConversation = (data: CreateConversationParams) =>
  axiosInstance.post<ConversationType>(
    `${BACKEND_URL}/conversations`,
    data,
    config
  );
