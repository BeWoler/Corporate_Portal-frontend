import { User } from "./user";

export interface Post {
  _id: string;
  user: User;
  text: string;
  likes: string[];
  file: string;
  time: string;
  comments: [
    {
      post: string;
      user: User;
      text: string;
      time: string;
      _id: string;
    }
  ];
}
