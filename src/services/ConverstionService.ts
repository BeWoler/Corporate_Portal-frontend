import api from "../http/axios";
import { AxiosResponse } from "axios";

export default class ConversationService {
  static conversation = (
    senderId: string,
    receiverId: string
  ): Promise<AxiosResponse> => {
    return api.post("/messenger/conversation", { senderId, receiverId });
  };

  static delete = (conversationId: string): Promise<AxiosResponse> => {
    return api.post("/messenger/delete", { conversationId });
  };

  static getConversation = (userId: string): Promise<AxiosResponse> => {
    return api.get(`/messenger/${userId}`);
  };
}
