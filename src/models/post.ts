import { User } from "./user";

export interface Post {
  _id: string;
  user: User;
  text: string;
  likes: string[];
  file: string;
  time: {
    year: number;
    month: number;
    day: number;
    hours: number;
    minutes: number;
  };
  comments: [
    {
      post: string;
      user: User;
      text: string;
      time: {
        year: number;
        month: number;
        day: number;
        hours: number;
        minutes: number;
      };
      _id: string;
    }
  ];
}
