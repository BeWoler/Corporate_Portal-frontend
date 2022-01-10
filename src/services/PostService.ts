import api from "../http/axios";
import { AxiosResponse } from "axios";

export default class PostService {
  static createPost(
    userId: string,
    text: string,
    fileName: string
  ): Promise<AxiosResponse> {
    return api.post<AxiosResponse>("/post", { userId, text, fileName });
  }

  static delete = (id: string): Promise<AxiosResponse> => {
    return api.post("/post/delete", { id });
  };

  static edit = (id: string, text: string): Promise<AxiosResponse> => {
    return api.patch("/post/edit", { id, text });
  };

  static createComment(
    id: string,
    text: string,
    userId: string
  ): Promise<AxiosResponse> {
    return api.post<AxiosResponse>("/post/comment", { id, text, userId });
  }

  static getUserPostByUsername = (username: string): Promise<AxiosResponse> => {
    return api.get(`/post/username/${username}`);
  };

  static getUserPostByUserId = (userId: string): Promise<AxiosResponse> => {
    return api.get(`/post/id/${userId}`);
  };

  static getAllPosts = (): Promise<AxiosResponse> => {
    return api.get("/post/all");
  };

  static like = (post: string, user: string): Promise<AxiosResponse> => {
    return api.post("/like", { post, user });
  };
}
