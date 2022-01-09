import api from "../http/axios";
import { AxiosResponse } from "axios";

export default class FriendsService {
  static async request(
    receiverId: string,
    senderId: string
  ): Promise<AxiosResponse> {
    return api.post("/friend/request", { receiverId, senderId });
  }

  static async accept(
    receiverId: string,
    senderId: string,
    requestId: string
  ): Promise<AxiosResponse> {
    return api.post("/friend/accept", { receiverId, senderId, requestId });
  }

  static async decline(requestId: string): Promise<AxiosResponse> {
    return api.post("/friend/decline", { requestId });
  }

  static async delete(
    userId: string,
    friendId: string
  ): Promise<AxiosResponse> {
    return api.post("/friend/delete", { userId, friendId });
  }

  static async getRequests(receiverId: string): Promise<AxiosResponse> {
    return api.get(`/friend/requests/${receiverId}`);
  }
}
