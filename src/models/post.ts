export interface Post {
  _id: string;
  author: string;
  text: string;
  likes: number;
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
