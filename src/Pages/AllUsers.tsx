import { FC, useState, useEffect } from "react";
import { User } from "../models/user";
import { Avatar } from "@mui/material";
import { URL } from "../http/axios";
import UserService from "../services/UserService";
import { Link } from "react-router-dom";
import "../styles/allUsers.css";

const AllUsers: FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const avatarStyles = {
    width: "100px",
    height: "100px",
    margin: "0 auto 1rem auto",
    backgroundColor: "#bf4444",
    fontSize: "50px",
  };

  useEffect(() => {
    UserService.fetchUsers().then((res) => setUsers(res.data));
    return () => setUsers(null);
  }, []);

  return (
    <div className="users__container">
      <h2 className="users__title">All Users</h2>
      <ul className="users__ul">
        {users.map((user) => (
          <li className="users__li" key={user._id}>
            <Link to={`/profile/${user._id}`}>
              <Avatar src={`${URL}/${user.avatar}`} sx={avatarStyles}></Avatar>
              {user.email}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllUsers;
