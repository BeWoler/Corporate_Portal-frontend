import { Avatar } from "@mui/material";
import "./message.css";
import { FC } from "react";

const Message: FC = ({ children }) => {
  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .5rem 0 0",
    backgroundColor: "#bf4444",
  };
  return (
      <div className={children ? "message__content own" : "message__content"}>
        <Avatar sx={avatarStyles}>GG</Avatar>
        <p className="message__text">
          gddddddddddddddddddddddddddddddddddddd
          <span className="message__time">12:58</span>
        </p>
      </div>
  );
};

export default Message;
