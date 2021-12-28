import { FC, useContext } from "react";
import { Context } from "../../index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import ConversationService from "../../services/ConverstionService";
import "./userProfile.css";

const SendMessage: FC = () => {
  const { store } = useContext(Context);
  const btnStyles = {
    width: "100%",
    margin: "0 0 1.5rem 0",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const createConversation = async() => {
    await ConversationService.conversation(store.user.id, store.otherUser.id);
  }

  return (
    <Link to="/chat" className="linkBtn">
      <Button variant="contained" sx={btnStyles} onClick={createConversation}>
        Send Message
      </Button>
    </Link>
  );
};

export default SendMessage;
