import api from "../http/axios";
import { AxiosResponse } from "axios";
import { PostResponse } from "../models/response/postResponse";

export default class PostService {
  static createPost(text: string): Promise<AxiosResponse<PostResponse>> {
    return api.post<PostResponse>("/post", { text });
  }

  static getUserPost = (): Promise<AxiosResponse> => {
    return api.get("/userPosts");
  }

  static getAllPosts = (): Promise<AxiosResponse<PostResponse[]>> => {
    return api.get<PostResponse[]>("/allPosts");
  }
}
