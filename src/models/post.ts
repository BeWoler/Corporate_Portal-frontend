export interface Post {
  _id: string;
  author: string;
  text: string;
  likes: number;
  comments: [];
}
