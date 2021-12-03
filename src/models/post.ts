export interface Post {
  _id: string;
  author: string;
  user: string;
  text: string;
  likes: string[];
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
      author: string;
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
