import { FC } from "react";
import "./messenger.css";
import { socketConnection } from "../../socket/socket";
import { Input, Button } from "@mui/material";
import Conversation from "../../components/Conversation/Conversation";
import Message from "../../components/Message/Message";

const Messenger: FC = () => {
  const inputStyles = {
    margin: "1rem 1rem",
    width: "80%",
    ":after": { borderBottom: "2px solid #bf4444" },
  };
  const btnStyles = {
    margin: "0 1rem 0 0",
    fontSize: ".7rem",
    backgroundColor: "#bf4444",
    ":hover": { backgroundColor: "#bc6464" },
  };
  
  return (
    <div className="messenger__container">
      <h2 className="messenger__title">Messages</h2>
      <div className="messenger__box">
        <Conversation />
        <div className="messenger__chat__column">
          <div className="messenger__chat">
            <Message />
            <Message children={true} />
            <Message />
            <Message />
          </div>
          <hr />
          <form className="messenger__form">
            <Input
              type="text"
              placeholder="Message"
              multiline={true}
              sx={inputStyles}
            />
            <Button variant="contained" sx={btnStyles}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
