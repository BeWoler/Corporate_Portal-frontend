import { Avatar } from "@mui/material";
import { User } from "../../models/user";
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
      <Avatar src={sender.avatar} sx={avatarStyles}></Avatar>
      <p className="message__text">
        {sender.firstName}
        <span>{text}</span>
        {/* <span className="message__time">
          {new Date().getHours()}:{new Date().getMinutes()}
        </span> */}
      </p>
    </div>
  );
};

export default Message;
