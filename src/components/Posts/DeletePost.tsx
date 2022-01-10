import { Button } from "@mui/material";
import { Post } from "../../models/post";

interface DeletePostProps {
  post: Post;
  deletePost: (postId: string) => Promise<void>;
}
const DeletePost = ({ post, deletePost }: DeletePostProps) => {
  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();
        await deletePost(post._id);
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
      Delete
    </Button>
  );
};

export default DeletePost;
