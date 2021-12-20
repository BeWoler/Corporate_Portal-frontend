import api from "../http/axios";

export default class LogoutService {
  static async logout(): Promise<void> {
    localStorage.clear();
    return api.post("/logout");
  }
}
