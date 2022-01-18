import { useContext } from "react";
import { Context } from "../../index";
import { User } from "../../models/user";
import { Avatar } from "@mui/material";
import "./conversation.sass";

interface ConversationProps {
  conversation?: User[];
}

const Conversation = ({ conversation }: ConversationProps) => {
  const { store } = useContext(Context);
  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .5rem 0 0",
    backgroundColor: "#534ED9",
  };

  if (conversation[1]._id !== store.user.id) {
    return (
      <div className="conversation">
        <div className="conversation__users" key={conversation[1].email}>
          <Avatar src={conversation[1].avatar} sx={avatarStyles}></Avatar>
          {conversation[1].firstName} {conversation[1].lastName}
        </div>
      </div>
    );
  }
  return (
    <div className="conversation">
      <div className="conversation__users" key={conversation[0].email}>
        <Avatar src={conversation[0].avatar} sx={avatarStyles}></Avatar>
        {conversation[0].firstName} {conversation[0].lastName}
      </div>
    </div>
  );
};

export default Conversation;
