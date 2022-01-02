import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import "./message.css";

interface MessageProps {
  message: any;
  own?: boolean;
}

const Message = ({ message, own }: MessageProps) => {
  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .5rem 0 0",
    backgroundColor: "#534ED9",
  };
  return (
    <div className={own ? "message__content own" : "message__content"}>
      <Link to={`/profile/${message.sender._id}`}>
        <Avatar src={message.sender.avatar} sx={avatarStyles}></Avatar>
      </Link>
      <span className="message__text">
        <div className="message__text__info">
          <span>{message.sender.firstName}</span>
          <Moment className="time" format="HH:mm">
            {message.date}
          </Moment>
        </div>
        <span>{message.text}</span>
      </span>
    </div>
  );
};

export default Message;
