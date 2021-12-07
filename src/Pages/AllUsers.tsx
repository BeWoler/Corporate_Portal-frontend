import { FC, useState } from "react";
import { User } from "../models/user";
import { Button, Avatar } from "@mui/material";
import { URL } from "../http/axios";
import UserService from "../services/UserService";
import "../styles/allUsers.css";

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  };
  return (
    <div className="users__container">
      <h2 className="users__title">All Users</h2>
      <Button
        onClick={getUsers}
        variant="contained"
        sx={{
          margin: "0 0 1rem 0",
          height: "1.5rem",
          backgroundColor: "#bf4444",
          ":hover": {
            backgroundColor: "#bc6464",
          },
        }}
      >
        Get users
      </Button>
      <ul className="users__ul">
        {users.map((user) => (
          <li className="users__li" key={user.email}>
            <Avatar
              src={`${URL}/${user.avatar}`}
              sx={{
                width: "100px",
                height: "100px",
                margin: "0 auto 1rem auto",
                backgroundColor: "#bf4444",
                fontSize: "50px",
              }}
            ></Avatar>
            {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
