import { AxiosResponse } from "axios";
import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";

export default class RegistrationService {
  static async registration(
    email: string,
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/registration", {
      email,
      username,
      password,
    });
  }
}
