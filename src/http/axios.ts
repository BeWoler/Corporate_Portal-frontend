import axios from "axios";
import { AuthResponse } from "../models/response/authResponse";

export const API_URL =
  "https://corporate-portal-server.herokuapp.com/api";
export const ADMIN_API_URL =
  "https://corporate-portal-server.herokuapp.com/admin";
export const URL = "https://corporate-portal-server.herokuapp.com";

const api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
});

export const adminApi = axios.create({
  withCredentials: true,
  baseURL: ADMIN_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return api.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
    throw error;
  }
);

adminApi.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

adminApi.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", response.data.accessToken);
        return adminApi.request(originalRequest);
      } catch (e) {
        console.log("Unauthorized");
      }
    }
    throw error;
  }
);

export default api;
