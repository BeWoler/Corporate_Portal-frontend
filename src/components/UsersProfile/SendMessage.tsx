import { FC, useContext } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import ConversationService from "../../services/ConverstionService";
import "./userProfile.sass";

const SendMessage: FC = () => {
  const navigate = useNavigate();
  const { store } = useContext(Context);
  const btnStyles = {
    width: "100%",
    margin: "0 0 1.5rem 0",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const createConversation = async () => {
    await ConversationService.conversation(store.user.id, store.otherUser.id);
  };

  return (
    <Button
      variant="contained"
      sx={btnStyles}
      onClick={async () => {
        await createConversation();
        navigate(`/friends/${store.user.id}`);
      }}
    >
      Send Message
    </Button>
  );
};

export default SendMessage;
