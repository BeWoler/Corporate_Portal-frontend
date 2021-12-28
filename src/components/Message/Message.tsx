import { Avatar } from "@mui/material";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import "./message.css";

interface MessageProps {
  text: string;
  own?: boolean;
  sender: User;
}

const Message = ({ text, own, sender }: MessageProps) => {
  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .5rem 0 0",
    backgroundColor: "#534ED9",
  };
  return (
    <div className={own ? "message__content own" : "message__content"}>
      <Link to={`/profile/${sender._id}`}><Avatar src={sender.avatar} sx={avatarStyles}></Avatar></Link>
      <p className="message__text">
        {sender.firstName}
        <span>{text}</span>
      </p>
    </div>
  );
};

export default Message;
