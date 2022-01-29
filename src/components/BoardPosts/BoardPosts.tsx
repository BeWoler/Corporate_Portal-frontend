import { FC, useEffect, useState, useContext } from "react";
import { Post } from "../../models/post";
import { Context } from "../../index";
import PostService from "../../services/PostService";
import FavoriteIcon from "@mui/icons-material/Favorite";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import AddCommentIcon from "@mui/icons-material/AddComment";
import Moment from "react-moment";
import CreateCommentForm from "../Posts/CreateCommentForm";
import Comment from "../Posts/Comment";
import "./boardPosts.sass";
import FetchMore from "../FetchMore/FetchMore";

const BoardPosts: FC = () => {
  const { store } = useContext(Context);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isOpen, setIsOpen] = useState<number>();
  const [limit, setLimit] = useState<number>(10);
  const [totalPosts, setTotalPosts] = useState<number>(0);

  const getAllPosts = async (limit: number) => {
    await PostService.getAllPosts(0).then((res) => {
      setPosts(res.data.posts.reverse());
      setTotalPosts(res.data.length);
    });
  };

  useEffect(() => {
    getAllPosts(limit);
    return () => {
      setPosts([]);
    };
  }, [limit]);

  const fetchMore = () => {
    return setLimit(limit + 10);
  };

  const addLike = async (postId: string) => {
    await PostService.like(postId, store.user.id);
    getAllPosts(limit);
  };

  const addComment = async (comment: string, postId: string) => {
    await PostService.createComment(postId, comment, store.user.id);
    getAllPosts(limit);
  };

  return (
    <div className="board">
      {posts?.length >= totalPosts ? null : <FetchMore fetchMore={fetchMore} />}
      <div className="board__posts__box">
        {posts.length > 0
          ? posts.map((post, position) => {
              return (
                <div key={post._id} className="board__post">
                  <div className="board__info">
                    <h4 className="board__author">
                      {post.user.firstName} {post.user.lastName}
                    </h4>
                    <p className="board__time">
                      <Moment className="time" format="DD.MM.YYYY">
                        {post.time}
                      </Moment>
                      <Moment className="time" format="HH.mm">
                        {post.time}
                      </Moment>
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
                  <hr className="post__hr" />
                  <div
                    className={`post__comment__container ${
                      isOpen === position ? "open" : ""
                    }`}
                  >
                    <div className="post__comment__create">
                      <CreateCommentForm
                        post={post}
                        createComment={addComment}
                      />
                      <Comment post={post} />
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default BoardPosts;
