import "./conversation.css";
import { FC, useState, useEffect } from "react";
import UserService from "../../services/UserService";
import { User } from "../../models/user";
import { Avatar } from "@mui/material";
import { URL } from "../../http/axios";

const Conversation: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .5rem 0 0",
    backgroundColor: "#bf4444",
  };

  useEffect(() => {
    UserService.fetchUsers("").then((res) => setUsers(res.data));
    return () => setUsers([]);
  }, []);

  return (
    <div className="conversation">
      <ul className="conversation__users__column">
        {users.map((user) => (
          <li className="chat__users__li" key={user.email}>
            <Avatar src={`${URL}/${user.avatar}`} sx={avatarStyles}></Avatar>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Conversation;
