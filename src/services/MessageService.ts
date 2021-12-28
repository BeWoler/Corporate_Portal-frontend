import api from "../http/axios";
import { AxiosResponse } from "axios";

export default class MessagesService {
  static message = (
    conversationId: string,
    sender: string,
    text: string
  ): Promise<AxiosResponse> => {
    return api.post("/messenger/message", { conversationId, sender, text });
  };

  static getMessages = (conversationId: string): Promise<AxiosResponse> => {
    return api.get(`/messenger/message/${conversationId}`);
  };
}
