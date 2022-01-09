import { adminApi } from "../../http/axios";
import { AxiosResponse } from "axios";

export default class AdminService {
  static async delete(userId: string): Promise<AxiosResponse> {
    return adminApi.post<AxiosResponse>("/delete", { userId });
  }

  static async registration(
    username: string,
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role?: string
  ): Promise<AxiosResponse> {
    return adminApi.post<AxiosResponse>("/registration", {
      username,
      email,
      password,
      firstName,
      lastName,
      role,
    });
  }

  static async edit(userId: string, { ...args }): Promise<AxiosResponse> {
    return adminApi.patch<AxiosResponse>("/editInfo", {
      userId: userId,
      userInfo: { ...args },
    });
  }

  static async changePassword(
    userId: string,
    newPassword: string
  ): Promise<AxiosResponse> {
    return adminApi.patch<AxiosResponse>("/changePassword", {
      userId,
      newPassword,
    });
  }

  static async changeAvatar(
    userId: string,
    avatarUrl: string
  ): Promise<AxiosResponse> {
    return adminApi.post<AxiosResponse>("/avatar", { userId, avatarUrl });
  }

  static async upload(formData: FormData): Promise<AxiosResponse> {
    return adminApi.post<AxiosResponse>("/upload", formData, {
      headers: { "content-type": "multipart/form-data" },
    });
  }
}
