import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";
import { AxiosResponse } from "axios";

export default class EditProfileService {
  static async edit(
    userId: string,
    { userInfo: { ...args } }
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.patch<AuthResponse>("/editInfo", {
      userId: userId,
      userInfo: { ...args },
    });
  }
}
