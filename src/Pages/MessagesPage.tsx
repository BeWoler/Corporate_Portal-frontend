import { FC } from "react";
import "../styles/messagesPage.css";
import { socketConnection } from "../socket/socket";

const MessagesPage: FC = () => {
  return (
    <div className="messages__container">
      <h2 className="messages__title">Messages</h2>
      <div className="messages__box">
        <button
          onClick={() => {
            socketConnection();
          }}
        >
          Connect
        </button>
        <div className="messages__user__column"></div>
        <div className="messages__chat__column"></div>
      </div>
    </div>
  );
};

export default MessagesPage;
