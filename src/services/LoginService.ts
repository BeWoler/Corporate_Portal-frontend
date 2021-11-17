import { AxiosResponse } from "axios";
import api from "../http/axios";
import { AuthResponse } from "../models/response/authResponse";

export default class LoginService {
  static async login(
    username: string,
    password: string
  ): Promise<AxiosResponse<AuthResponse>> {
    return api.post<AuthResponse>("/login", { username, password });
  }
}
