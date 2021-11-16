import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";
import { AxiosResponse } from "axios";

export default class EditProfileService {
  static async edit(username: string, {...args}): Promise<AxiosResponse<AuthResponse>> {
    return api.patch<AuthResponse>("/editInfo");
  }
}