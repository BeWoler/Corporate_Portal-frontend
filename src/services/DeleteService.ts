import api from "../http/axios";

export default class DeleteService {
  static async delete(): Promise<void> {
    return api.post("/delete");
  }
}