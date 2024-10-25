import axios from "axios";

import { refreshToken } from "@/services/auth";

const axiosInstance = axios.create();

axiosInstance.defaults.baseURL = "http://localhost:8000";
axiosInstance.defaults.timeout = 1000 * 60 * 10;
axiosInstance.defaults.headers["Content-Type"] = "application/json";
axiosInstance.defaults.withCredentials = true;

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers["Cache-Control"] = "no-cache";
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let refreshTokenPromise: Promise<unknown> | null = null;

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      location.href = "/login";
    }

    const originalRequest = error.config;
    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = refreshToken()
          .then((response) => {
            return response.data?.accessToken;
          })
          .catch(() => {
            location.href = "/login";
          })
          .finally(() => {
            refreshTokenPromise = null;
          });
      }
      return refreshTokenPromise.then(() => {
        return axiosInstance(originalRequest);
      });
    }
    if (error.response?.status !== 410) {
      location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
