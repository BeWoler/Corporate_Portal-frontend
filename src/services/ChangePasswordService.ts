import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";
import { AxiosResponse } from "axios";

export default class ChangePasswordService {
  static async change(username: string, password: string): Promise<AxiosResponse<AuthResponse>> {
    return api.patch<AuthResponse>("/changePassword");
  }
}