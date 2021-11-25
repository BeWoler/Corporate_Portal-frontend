import { FC, useState, useEffect } from "react";
import { Post } from "../models/post";
import { Input, Button } from "@mui/material";
import "../styles/userPosts.css";
import PostService from "../services/PostService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";

const UserPosts: FC = () => {
  const [postText, setPostText] = useState<string>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>();
  const [editPostText, setEditPostText] = useState<string>();
  const [likesCounter, setLikesCounter] = useState<number>();

  const getUserPosts = async () => {
    const response = await PostService.getUserPost();
    await setPosts(response.data.reverse());
  };

  useEffect(() => {
    getUserPosts();
    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <div className="profile__posts">
      <form className="posts__create">
        <Input
          type="file"
          sx={{
            margin: "0 0 1rem 0",
            width: "fit-content",
            ":after": { borderBottom: "2px solid #bf4444" },
          }}
        />
        <Input
          onChange={(e) => {
            setPostText(e.target.value);
          }}
          type="text"
          placeholder="Tell us something"
          multiline={true}
          sx={{
            margin: "0 0 1rem 0",
            ":after": { borderBottom: "2px solid #bf4444" },
          }}
        />
        <Button
          onClick={async (e) => {
            e.preventDefault();
            await PostService.createPost(postText);
            getUserPosts();
          }}
          variant="contained"
          sx={{
            margin: "2rem 2rem 1rem 2rem",
            backgroundColor: "#bf4444",
            ":hover": {
              backgroundColor: "#bc6464",
            },
          }}
        >
          Create Post
        </Button>
      </form>
      <div className="userPosts__container">
        {posts.map((post, position) => {
          return (
            <div key={post._id} className="userPosts__post">
              <h4 className="post__author">{post.author}</h4>
              <p className="post__text">{post.text}</p>
              <div className="post__functions">
                <div className="post__likes">
                  <FavoriteIcon
                    onClick={() => {
                      setLikesCounter(++post.likes);
                    }}
                    sx={{
                      color: "#bf4444",
                      verticalAlign: "middle",
                      margin: "0 .2rem 0 0",
                      transition: "all ease .2s",
                      ":hover": { transform: "scale(1.2)" },
                    }}
                  />
                  <span>{post.likes}</span>
                  <AddCommentIcon
                    onClick={() => {
                      setLikesCounter(++post.likes);
                    }}
                    sx={{
                      color: "#bf4444",
                      verticalAlign: "middle",
                      margin: "0 .2rem 0 0",
                      transition: "all ease .2s",
                      ":hover": { transform: "scale(1.2)" },
                    }}
                  />
                </div>
                <div className="post__btns">
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      getUserPosts();
                      return <div>123</div>;
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
                    Edit
                  </Button>
                  <Button
                    onClick={async (e) => {
                      e.preventDefault();
                      await PostService.delete(posts[position]._id);
                      getUserPosts();
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
              <hr className="post__hr" />
              <div className="post__comment__create">
                <form className="comment__create__form">
                  <Button
                    onClick={async(e) => {
                      e.preventDefault();
                      await PostService.createComment(posts[position]._id, comment);
                      getUserPosts();
                    }}
                    variant="contained"
                    sx={{
                      margin: "0 1rem 0 0",
                      fontSize: ".7rem",
                      backgroundColor: "#bf4444",
                      ":hover": {
                        backgroundColor: "#bc6464",
                      },
                    }}
                  >
                    Add
                  </Button>
                  <Input
                    onChange={(e) => setComment(e.target.value)}
                    type="text"
                    placeholder="Comment"
                    multiline={true}
                    sx={{
                      margin: "0 0 1rem 0",
                      width: "80%",
                      ":after": { borderBottom: "2px solid #bf4444" },
                    }}
                  />
                </form>
              </div>
              {post.comments.length > 0
                ? post.comments.map((comment) => {
                    return (
                      <div key={comment._id} className="post__comment">
                        <h5 className="comment__author">{comment.author}</h5>
                        <p className="comment__text">{comment.text}</p>
                      </div>
                    );
                  })
                : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserPosts;
