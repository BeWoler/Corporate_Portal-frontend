import { FC, useEffect, useState } from "react";
import { Post } from "../models/post";
import PostService from "../services/PostService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import "../styles/board.css";

const Board: FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const getAllPosts = async () => {
    const response = await PostService.getAllPosts();
    await setPosts(response.data.reverse());
  };

  useEffect(() => {
    getAllPosts();
    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <div className="board__container">
      <h2 className="board__title">Board</h2>
      <div className="board__box">
        {posts.map((post) => {
          return (
            <div key={post._id} className="board__post">
              <h4 className="board__author">{post.author}</h4>
              <p className="board__text">{post.text}</p>
              <div className="board__likes">
                <FavoriteIcon
                  sx={{
                    color: "#bf4444",
                    verticalAlign: "middle",
                    margin: "0 .2rem 0 0",
                  }}
                />
                <span>{post.likes}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
