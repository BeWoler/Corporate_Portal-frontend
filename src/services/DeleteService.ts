import api from "../http/axios";

export default class DeleteService {
  static async delete(userId: string): Promise<void> {
    return api.post("/delete", { userId });
  }
}
