import api from "../http/axios";
import { AxiosResponse } from "axios";
import { User } from "../models/user";
import { AuthResponse } from "../models/response/authResponse";

export default class UserService {
  static fetchUsers = (args?: any): Promise<AxiosResponse<User[]>> => {
    return api.get<User[]>("/users", { params: { ...args } });
  };

  static blockUser = (
    userId: string,
    blockedUserId: string
  ): Promise<AxiosResponse> => {
    return api.post("/user/block", { userId, blockedUserId });
  };

  static unblockUser = (
    userId: string,
    blockedUserId: string
  ): Promise<AxiosResponse> => {
    return api.post("/user/unblock", { userId, blockedUserId });
  };

  static getUserInfo = (
    userId: string
  ): Promise<AxiosResponse<AuthResponse>> => {
    return api.get<AuthResponse>(`/profile/${userId}`);
  };

  static getUserPost = (userId: string): Promise<AxiosResponse> => {
    return api.get(`/profile/posts/${userId}`);
  };
}
