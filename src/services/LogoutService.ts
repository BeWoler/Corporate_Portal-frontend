import api from "../http/axios";

export default class LogoutService {
  static async logout(): Promise<void> {
    return api.post('/logout')
  }
}
