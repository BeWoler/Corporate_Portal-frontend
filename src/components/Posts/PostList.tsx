import { useState, useContext } from "react";
import { Context } from "../../index";
import { Button } from "@mui/material";
import { Post } from "../../models/post";
import { useLocation } from "react-router-dom";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Moment from "react-moment";
import Comment from "./Comment";
import CreateCommentForm from "./CreateCommentForm";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";
import "./posts.css";

interface PostProps {
  posts: Post[];
  addLike: (postId: string) => Promise<void>;
  addComment: (comment: string, postId: string) => Promise<void>;
  deletePost?: (postId: string) => Promise<void>;
  editPost?: (postId: string, postText: string) => Promise<void>;
}

const PostList = ({
  posts,
  addLike,
  addComment,
  deletePost,
  editPost,
}: PostProps) => {
  const { store } = useContext(Context);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState<number>();
  const [edit, setEdit] = useState<number>();

  const currentId = location.pathname.split("/").reverse()[0];

  return (
    <div className="userPosts__container">
      {posts.map((post, position) => {
        return (
          <div key={post._id} className="userPosts__post">
            <div className="post__info">
              <h4 className="post__author">
                {post.user.firstName} {post.user.lastName}
              </h4>
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
                  onClick={async () => await addLike(post._id)}
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
              <div className="post__btns">
                {store.user.id === currentId ? (
                  <Button
                    onClick={(e) => {
                      e.preventDefault();
                      return edit !== position ? setEdit(position) : -1;
                    }}
                    variant="contained"
                    sx={{
                      margin: "0 0 0 1rem",
                      fontSize: ".7rem",
                      backgroundColor: "#534ED9",
                      ":hover": {
                        backgroundColor: "#7673D9",
                      },
                    }}
                  >
                    Edit
                  </Button>
                ) : null}
                {store.user.id === currentId ? (
                  <DeletePost post={post} deletePost={deletePost} />
                ) : null}
              </div>
            </div>
            <hr className="post__hr" />
            {store.user.id === currentId ? (
              <EditPost
                post={post}
                position={position}
                editPost={editPost}
                edit={edit}
              />
            ) : null}
            <div
              className={`post__comment__container ${
                isOpen === position ? "open" : ""
              }`}
            >
              <div className="post__comment__create">
                <CreateCommentForm post={post} createComment={addComment} />
                <Comment post={post} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PostList;
