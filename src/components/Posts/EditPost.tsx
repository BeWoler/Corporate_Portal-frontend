import { useState } from "react";
import { Input, Button } from "@mui/material";
import { Post } from "../../models/post";

interface EditPostProps {
  post: Post;
  position: number;
  edit: number;
  editPost: (postId: string, postText: string) => Promise<void>;
}

const EditPost = ({ post, position, edit, editPost }: EditPostProps) => {
  const [postText, setPostText] = useState<string>();

  return (
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
          ":after": { borderBottom: "2px solid #534ED9" },
        }}
      />
      <Button
        onClick={async (e) => {
          e.preventDefault();
          editPost(post._id, postText);
        }}
        variant="contained"
        sx={{
          margin: "0 1rem 0 1rem",
          fontSize: ".7rem",
          backgroundColor: "#534ED9",
          ":hover": {
            backgroundColor: "#7673D9",
          },
        }}
      >
        Save
      </Button>
    </div>
  );
};

export default EditPost;
