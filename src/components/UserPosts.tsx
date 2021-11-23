import { FC, useEffect, useState } from "react";
import { Post } from "../models/post";
import PostService from "../services/PostService";
import "../styles/userPosts.css";
import { Button } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

const UserPosts: FC = ({ children }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [postCounter, setPostCounter] = useState(posts.length);

  const getUserPosts = async () => {
    const response = await PostService.getUserPost();
    await setPosts(response.data.reverse());
  };

  useEffect(() => {
    getUserPosts();
    return () => {
      setPosts([]);
    };
  }, [postCounter, children]);

  return (
    <div className="userPosts__container">
      {posts.map((post, position) => {
        return (
          <div key={post._id} className="userPosts__post">
            <h4 className="post__author">{post.author}</h4>
            <p className="post__text">{post.text}</p>
            <div className="post__functions">
              <div className="post__likes">
                <FavoriteIcon
                  sx={{
                    color: "#bf4444",
                    verticalAlign: "middle",
                    margin: "0 .2rem 0 0",
                  }}
                />
                <span>{post.likes}</span>
              </div>
              <div className="post__btns">
                <Button
                  variant="contained"
                  sx={{
                    margin: "0 0 0 1rem",
                    fontSize: ".7rem",
                    backgroundColor: "#bf4444",
                    ":hover": {
                      backgroundColor: "#bc6464",
                    },
                  }}
                >
                  Edit
                </Button>
                <Button
                  onClick={async () => {
                    await PostService.delete(posts[position]._id);
                    setPostCounter(posts.length - 1);
                  }}
                  variant="contained"
                  sx={{
                    margin: "0 0 0 1rem",
                    fontSize: ".7rem",
                    backgroundColor: "#bf4444",
                    ":hover": {
                      backgroundColor: "#bc6464",
                    },
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserPosts;
