import { FC, useState, useEffect } from "react";
import { Post } from "../../models/post";
import { Input, Button } from "@mui/material";
import api from "../../http/axios";
import "./userPosts.css";
import PostService from "../../services/PostService";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AddCommentIcon from "@mui/icons-material/AddComment";

const UserPosts: FC = () => {
  const [postText, setPostText] = useState<string>();
  const [posts, setPosts] = useState<Post[]>([]);
  const [comment, setComment] = useState<string>();
  const [isOpen, setIsOpen] = useState<number>();
  const [edit, setEdit] = useState<number>();

  const [img, setImg] = useState<any>();
  const [file, setFile] = useState<any>();

  const currentId = window.location.href.split("/").reverse()[0];

  const fileUpload = async (e: any) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.append("files", file);
      const res = await api.post("/post/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      await PostService.createPost(postText, res.data.path);
    } catch (e) {
      await PostService.createPost(postText, null);
    }
  };

  const fileChange = (e: any) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setImg(null);
      setFile(null);
    }
  };

  let filePreview = img;

  if (img) {
    filePreview = (
      <div>
        <a href={img} download>
          {file.type === "image/jpeg" ||
          file.type === "image/jpg" || 
          file.type === "image/png" 
          ? (
            <img src={img} className="file__preview" alt={file.name} />
          ) : (
            <div>
              <InsertDriveFileIcon
                sx={{
                  color: "#BF4444",
                  width: "30px",
                  height: "30px",
                  verticalAlign: "middle",
                  margin: "1rem 0",
                }}
              />
              {file.name}
            </div>
          )}
        </a>
      </div>
    );
  } else {
    filePreview = null;
  }

  const getUserPosts = async () => {
    const response = await PostService.getUserPostByUserId(currentId);
    setPosts(response.data.reverse());
  };

  useEffect(() => {
    getUserPosts();
    return () => {
      setPosts([]);
    };
  }, []);

  return (
    <div className="profile__posts">
      <form className="posts__create" encType="miltipart/form-data">
        <Input
          name="files"
          type="file"
          sx={{
            margin: "0 0 1rem 0",
            width: "fit-content",
            ":after": { borderBottom: "2px solid #bf4444" },
          }}
          onChange={(e) => {
            fileChange(e);
          }}
        />
        {filePreview}
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
            await fileUpload(e);
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
              <div className="post__info">
                <h4 className="post__author">{post.author}</h4>
                <p className="post__time">
                  {post.time.day}.{post.time.month}.{post.time.year}. At{" "}
                  {post.time.hours}:{post.time.minutes}
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
                        color: "#BF4444",
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
                    onClick={async () => {
                      await PostService.like(
                        posts[position]._id,
                        currentId
                      );
                      await getUserPosts();
                    }}
                    sx={{
                      color: "#bf4444",
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
                      return edit !== position ? setEdit(position) : -1;
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
              <div className={`post__edit ${edit === position ? "edit" : ""}`}>
                <Input
                  onChange={(e) => {
                    setPostText(e.target.value);
                  }}
                  type="text"
                  placeholder="Enter new data"
                  multiline={true}
                  sx={{
                    margin: "0 0 1rem 0",
                    width: "100%",
                    ":after": { borderBottom: "2px solid #bf4444" },
                  }}
                />
                <Button
                  onClick={async (e) => {
                    e.preventDefault();
                    await PostService.edit(posts[position]._id, postText);
                    getUserPosts();
                    setEdit(-1);
                  }}
                  variant="contained"
                  sx={{
                    margin: "0 1rem 0 1rem",
                    fontSize: ".7rem",
                    backgroundColor: "#bf4444",
                    ":hover": {
                      backgroundColor: "#bc6464",
                    },
                  }}
                >
                  Save
                </Button>
              </div>
              <div
                className={`post__comment__container ${
                  isOpen === position ? "open" : ""
                }`}
              >
                <div className="post__comment__create">
                  <form className="comment__create__form">
                    <Button
                      onClick={async (e) => {
                        e.preventDefault();
                        await PostService.createComment(
                          posts[position]._id,
                          comment
                        );
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
                  {post.comments.length > 0
                    ? post.comments.map((comment) => {
                        return (
                          <div key={comment._id} className="post__comment">
                            <div className="comment__info">
                              <h5 className="comment__author">
                                {comment.author}
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
        })}
      </div>
    </div>
  );
};

export default UserPosts;
