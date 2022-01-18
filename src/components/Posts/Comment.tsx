import { Post } from "../../models/post";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "react-moment";

interface CommentProps {
  post: Post;
}

const Comment = ({ post }: CommentProps) => {
  const avatarStyle = {
    width: "45px",
    height: "45px",
    margin: "0 1rem .5rem 0",
    backgroundColor: "#BF3030",
  };

  return (
    <>
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
                    {comment.user.firstName} {comment.user.lastName}
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
    </>
  );
};

export default Comment;
