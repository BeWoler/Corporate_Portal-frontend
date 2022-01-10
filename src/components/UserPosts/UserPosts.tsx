import { FC, useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { Post } from "../../models/post";
import { useLocation } from "react-router-dom";
import PostService from "../../services/PostService";
import CreatePostForm from "../Posts/CreatePostForm";
import PostList from "../Posts/PostList";

const UserPosts: FC = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const [posts, setPosts] = useState<Post[]>([]);

  const currentId = location.pathname.split("/").reverse()[0];

  const getUserPosts = async () => {
    const response = await PostService.getUserPostByUserId(currentId);
    setPosts(response.data.reverse());
  };

  const addLike = async (postId: string) => {
    await PostService.like(postId, store.user.id);
    getUserPosts();
  };

  const addComment = async (comment: string, postId: string) => {
    await PostService.createComment(postId, comment, store.user.id);
    getUserPosts();
  };

  const deletePost = async (postId: string) => {
    await PostService.delete(postId);
    getUserPosts();
  };

  const editPost = async (postId: string, postText: string) => {
    await PostService.edit(postId, postText);
    getUserPosts();
  };

  useEffect(() => {
    PostService.getUserPostByUserId(currentId).then((res) =>
      setPosts(res.data.reverse())
    );
    return () => {
      setPosts([]);
    };
  }, [currentId]);

  return (
    <div className="profile__posts">
      {store.user.id === currentId ? (
        <CreatePostForm createPost={getUserPosts} />
      ) : null}
      <PostList
        posts={posts}
        addLike={addLike}
        addComment={addComment}
        deletePost={deletePost}
        editPost={editPost}
      />
    </div>
  );
};

export default UserPosts;
