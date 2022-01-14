import { useState } from "react";
import { Input, Button } from "@mui/material";
import { Post } from "../../models/post";

interface CreateCommentFormprops {
  post: Post;
  createComment: any;
}
const CreateCommentForm = ({ post, createComment }: CreateCommentFormprops) => {
  const [comment, setComment] = useState<string>("");

  return (
    <form className="comment__create__form">
      <Button
        disabled={comment === ""}
        onClick={async () => {
          await createComment(comment, post._id);
          await setComment("");
        }}
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
  );
};

export default CreateCommentForm;
