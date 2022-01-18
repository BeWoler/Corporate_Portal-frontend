import { useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import { Avatar, Input } from "@mui/material";
import CurrentUser from "./CurrentUser";
import "./users.sass";

interface UsersProps {
  users: User[];
  setUser: any;
}

const Users = ({ users, setUser }: UsersProps) => {
  const { store } = useContext(Context);
  const [allUsers, setAllUsers] = useState(users);
  const [currentUser, setCurrentUser] = useState<User>(store.user);
  const [search, setSearch] = useState<string>("");

  useEffect(() => {
    setAllUsers(users);
    return () => setAllUsers(null);
  }, [users]);

  const avatarStyles = {
    width: "40px",
    height: "40px",
    margin: "0 .8rem 0 0",
    backgroundColor: "#534ED9",
    fontSize: "50px",
  };

  const inputStyles = {
    margin: "0 0 1rem 0",
    width: "330px",
    backgroundColor: "#fff",
    padding: ".5rem",
    borderRadius: ".3rem .3rem 0 0",
    ":after": { borderBottom: "2px solid #534ED9" },
  };

  const filteredUsers = allUsers?.filter((user) => {
    return (
      (user.firstName + " " + user.lastName)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="admin__users">
      <Input
        placeholder="Search by first name, last name, or email"
        type="search"
        sx={inputStyles}
        onChange={(e) => setSearch(e.target.value)}
      />
      <CurrentUser currentUser={currentUser} />
      <ul className="admin__users__ul">
        {filteredUsers?.map((user) => {
          return (
            <li
              className="admin__users__li"
              key={user._id}
              onClick={() => {
                setUser(user);
                setCurrentUser(user);
              }}
            >
              <Link to={`/profile/${user._id}`}>
                <Avatar src={user.avatar} sx={avatarStyles}></Avatar>
              </Link>
              <ul className="admin__users__data__ul">
                <li className="admin__users__data__li">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : null}
                </li>
                <li className="admin__users__data__li">
                  {user.email ? `Email: ${user.email}` : null}
                </li>
                <li className="admin__users__data__li">
                  {user.city ? `City: ${user.city}` : null}
                </li>
                <li className="admin__users__data__li">
                  {user.birthday
                    ? `Birthday: ${user.birthday
                        .split("-")
                        .reverse()
                        .join(".")}`
                    : null}
                </li>
              </ul>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Users;
