import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";
import { AxiosResponse } from "axios";

export default class ChangePasswordService {
  static async change(
    userId: string,
    newPassword: string,
    oldPassword: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.patch<AuthResponse>("/changePassword", {
      userId,
      newPassword,
      oldPassword,
    });
  }
}
