import { FC, useState } from "react";
import { User } from "../models/user";
import { Button } from "@mui/material";
import UserService from "../services/UserService";

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    const response = await UserService.fetchUsers();
    setUsers(response.data);
  };
  return (
    <ul className="users__ul">
      <Button
        onClick={getUsers}
        variant="contained"
        sx={{
          margin: "-0.2rem 0 0 1rem",
          height: "1.5rem",
          backgroundColor: "#D65A3E",
          ":hover": {
            backgroundColor: "#B04A33",
          },
        }}
      >
        Get users
      </Button>
      {users.map((user) => (
        <li className="users__li" key={user.email}>
          {user.email}
        </li>
      ))}
    </ul>
  );
};

export default AllUsers;
