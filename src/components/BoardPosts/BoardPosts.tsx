import { FC, useEffect, useState, useContext } from "react";
import { Post } from "../../models/post";
import { Context } from "../../index";
import PostService from "../../services/PostService";
import { Button, Input } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Link } from "react-router-dom";
import "./board.css";
import { Avatar } from "@mui/material";

const BoardPosts: FC = () => {
  const { store } = useContext(Context);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<number>();

  const getAllPosts = async () => {
    await PostService.getAllPosts().then((res) => setPosts(res.data.reverse()));
  };

  useEffect(() => {
    getAllPosts();
    return () => {
      setPosts([]);
    };
  }, []);

  const like = async (postId: string) => {
    await PostService.like(postId, store.user.id);
    getAllPosts();
  };

  const commenting = async (postId: string) => {
    await PostService.createComment(postId, comment, store.user.id);
    getAllPosts();
    setComment("");
  };

  const avatarStyle = {
    width: "45px",
    height: "45px",
    margin: "0 1rem .5rem 0",
    backgroundColor: "#BF3030",
  };

  return (
    <>
      {posts.length > 0 ? (
        posts.map((post, position) => {
          return (
            <div key={post._id} className="board__post">
              <div className="board__info">
                <h4 className="board__author">{post.user.username}</h4>
                <p className="board__time">
                  {post.time.day}.{post.time.month}.{post.time.year}. At{" "}
                  {post.time.hours}:{post.time.minutes}
                </p>
              </div>
              {post.file.split(".").reverse()[0] === "jpg" ||
              post.file.split(".").reverse()[0] === "png" ||
              post.file.split(".").reverse()[0] === "jpeg" ? (
                <a href={post.file} download target="__blank">
                  <img
                    src={post.file}
                    className="file__preview"
                    alt="preview"
                  />
                </a>
              ) : post.file.split("/").reverse()[0] !== "null" ? (
                <a href={post.file} download target="__blank">
                  <InsertDriveFileIcon
                    sx={{
                      color: "#534ED9",
                      width: "30px",
                      height: "30px",
                      verticalAlign: "middle",
                      margin: "1rem 0",
                    }}
                  />
                  {post.file.split("-").reverse()[0]}
                </a>
              ) : null}
              <p className="board__text">{post.text}</p>
              <div className="board__likes">
                <FavoriteIcon
                  onClick={() => like(post._id)}
                  sx={{
                    color: "#BF3030",
                    verticalAlign: "middle",
                    margin: "0 .2rem 0 0",
                    transition: "all ease .2s",
                    ":hover": { transform: "scale(1.2)" },
                  }}
                />
                <span>{post.likes.length}</span>
                <AddCommentIcon
                  onClick={() => {
                    return isOpen !== position ? setIsOpen(position) : -1;
                  }}
                  sx={{
                    color: "#BF3030",
                    verticalAlign: "middle",
                    margin: "0 .2rem 0 0",
                    transition: "all ease .2s",
                    ":hover": { transform: "scale(1.2)" },
                  }}
                />
              </div>
              <hr className="post__hr" />
              <div
                className={`post__comment__container ${
                  isOpen === position ? "open" : ""
                }`}
              >
                <div className="post__comment__create">
                  <form className="comment__create__form">
                    <Button
                      disabled={comment === ""}
                      onClick={() => commenting(post._id)}
                      variant="contained"
                      sx={{
                        margin: "0 1rem 1rem 0",
                        fontSize: ".7rem",
                        backgroundColor: "#534ED9",
                        ":hover": {
                          backgroundColor: "#7673D9",
                        },
                      }}
                    >
                      Add
                    </Button>
                    <Input
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      type="text"
                      placeholder="Comment"
                      multiline={true}
                      sx={{
                        margin: "0 0 1rem 0",
                        width: "80%",
                        ":after": { borderBottom: "2px solid #534ED9" },
                      }}
                    />
                  </form>
                  {post.comments.length > 0
                    ? post.comments.map((comment) => {
                        return (
                          <div key={comment._id} className="post__comment">
                            <div className="comment__info">
                              <h5 className="comment__author">
                                <Link to={`/profile/${comment.user._id}`}>
                                  <Avatar
                                    src={comment.user.avatar}
                                    sx={avatarStyle}
                                  ></Avatar>
                                </Link>
                                {comment.user.username}
                              </h5>
                              <p className="comment__time">
                                {comment.time.day}.{comment.time.month}.
                                {comment.time.year}. At {comment.time.hours}.
                                {comment.time.minutes}
                              </p>
                            </div>
                            <p className="comment__text">{comment.text}</p>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <h3 className="no__posts">There are no post yet</h3>
      )}
    </>
  );
};

export default BoardPosts;
