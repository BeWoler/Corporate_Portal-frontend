import { FC, useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { Post } from "../../models/post";
import { Input, Button } from "@mui/material";
import "./otherUserPosts.css";
import PostService from "../../services/PostService";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import { Avatar } from "@mui/material";
import Moment from "react-moment";

const OtherUserPosts: FC = () => {
  const { store } = useContext(Context);
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>("");
  const [isOpen, setIsOpen] = useState<number>();

  const currentId = window.location.href.split("/").reverse()[0];

  const getUserPosts = async () => {
    const response = await PostService.getUserPostByUserId(currentId);
    setPosts(response.data.reverse());
  };

  const like = async (postId: string) => {
    await PostService.like(postId, store.user.id);
    await getUserPosts();
  };

  const commenting = async (postId: string) => {
    await PostService.createComment(postId, comment, store.user.id);
    getUserPosts();
    setComment("");
  };

  useEffect(() => {
    PostService.getUserPostByUserId(currentId).then((res) =>
      setPosts(res.data.reverse())
    );
    return () => {
      setPosts([]);
    };
  }, [currentId]);

  const avatarStyle = {
    width: "45px",
    height: "45px",
    margin: "0 1rem .5rem 0",
    backgroundColor: "#BF3030",
  };

  return (
    <div className="profile__posts">
      <div className="userPosts__container">
        {posts.map((post, position) => {
          return (
            <div key={post._id} className="userPosts__post">
              <div className="post__info">
                <h4 className="post__author">{post.user.username}</h4>
                <p className="post__time">
                  <Moment className="time" format="DD.MM.YYYY">
                    {post.time}
                  </Moment>
                  <Moment className="time" format="HH.mm">
                    {post.time}
                  </Moment>
                </p>
              </div>
              <div className="post__files">
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
              </div>
              <p className="post__text">{post.text}</p>
              <div className="post__functions">
                <div className="post__likes">
                  <FavoriteIcon
                    onClick={async () => await like(post._id)}
                    color={
                      post.likes.includes(store.user.id) ? "error" : "action"
                    }
                    sx={{
                      verticalAlign: "middle",
                      margin: "0 .2rem 0 0",
                      transition: "all ease .2s",
                      ":hover": { transform: "scale(1.2)" },
                    }}
                  />
                  <span>
                    {post.likes.includes(store.user.id) ? "liked" : null}
                  </span>
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
                <div className="post__btns"></div>
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
                        margin: "0 1rem 0 0",
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
                                <Avatar
                                  src={comment.user.avatar}
                                  sx={avatarStyle}
                                ></Avatar>
                                {comment.user.username}
                              </h5>
                              <p className="comment__time">
                                <Moment className="time" format="DD.MM.YYYY">
                                  {comment.time}
                                </Moment>
                                <Moment className="time" format="HH.mm">
                                  {comment.time}
                                </Moment>
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
        })}
      </div>
    </div>
  );
};

export default OtherUserPosts;
