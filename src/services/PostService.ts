import api from "../http/axios";
import { AxiosResponse } from "axios";
import { PostResponse } from "../models/response/postResponse";

export default class PostService {
  static createPost(text: string): Promise<AxiosResponse<PostResponse>> {
    return api.post<PostResponse>("/post", { text });
  }

  static delete = (id: string): Promise<AxiosResponse> => {
    return api.post("/post/delete", { id });
  }

  static edit = (id: string, text: string): Promise<AxiosResponse> => {
    return api.patch("/post/edit", { id, text });
  }

  static createComment(id: string, text: string): Promise<AxiosResponse<PostResponse>> {
    return api.post<PostResponse>("/post/comment", { id, text });
  }

  static getUserPost = (): Promise<AxiosResponse> => {
    return api.get("/userPosts");
  }

  static getAllPosts = (): Promise<AxiosResponse> => {
    return api.get("/allPosts");
  }

  static like = (post: string, user: string): Promise<AxiosResponse> => {
    return api.post("/like", { post, user });
  }
}
