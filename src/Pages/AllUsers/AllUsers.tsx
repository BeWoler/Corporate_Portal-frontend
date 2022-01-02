import { FC, useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { User } from "../../models/user";
import { Avatar, Input } from "@mui/material";
import { Link } from "react-router-dom";
import "./allUsers.css";
import UserFilter from "../../components/UserFilter/UserFilter";

const AllUsers: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const avatarStyles = {
    width: "100px",
    height: "100px",
    margin: "0 .8rem 0 0",
    backgroundColor: "#534ED9",
    fontSize: "50px",
  };

  const inputStyles = {
    margin: "0 0 2rem 0",
    width: "330px",
    backgroundColor: "#fff",
    padding: ".5rem",
    borderRadius: ".3rem .3rem 0 0",
    ":after": { borderBottom: "2px solid #534ED9" },
  };

  const getUsersWithQuery = async (params: any) => {
    await store.getAllUsers(params);
    setUsers(store.allUsers);
    return () => setUsers(null);
  };

  const getUsersWithoutQuery = async () => {
    await store.getAllUsers("");
    setUsers(store.allUsers);
    return () => setUsers(null);
  };

  useEffect(() => {
    store.getAllUsers("").then(() => setUsers(store.allUsers));
    return () => setUsers(null);
  }, [store]);

  const filteredUsers = users.filter((user) => {
    return (
      (user.firstName + " " + user.lastName)
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div className="users__container">
      <h2 className="users__title">All Users</h2>
      <Input
        placeholder="Search by first name, last name, or email"
        type="search"
        sx={inputStyles}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="users__box">
        <ul className="users__ul">
          {filteredUsers
            ? filteredUsers.map((user) => (
                <li className="users__li" key={user._id}>
                  <Link to={`/profile/${user._id}`}>
                    <Avatar src={user.avatar} sx={avatarStyles}></Avatar>
                  </Link>
                  <ul className="users__data__ul">
                    <li className="users__data__li">
                      {user.firstName && user.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : null}
                    </li>
                    <li className="users__data__li">
                      {user.email ? `Email: ${user.email}` : null}
                    </li>
                    <li className="users__data__li">
                      {user.city ? `City: ${user.city}` : null}
                    </li>
                    <li className="users__data__li">
                      {user.birthday
                        ? `Birthday: ${user.birthday
                            .split("-")
                            .reverse()
                            .join(".")}`
                        : null}
                    </li>
                  </ul>
                </li>
              ))
            : null}
        </ul>
        <div className="users__filter">
          <UserFilter
            users={users}
            getUsersWithQuery={getUsersWithQuery}
            getUsersWithoutQuery={getUsersWithoutQuery}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(AllUsers);
