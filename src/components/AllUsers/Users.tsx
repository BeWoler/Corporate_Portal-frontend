import { FC, useState, useEffect, useContext } from "react";
import { Context } from "../../index";
import { User } from "../../models/user";
import { Input } from "@mui/material";
import UserFilter from "../../components/UserFilter/UserFilter";
import AllUsers from "./AllUsers";
import "./allUsers.sass";

const Users: FC = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);
  const [search, setSearch] = useState<string>("");

  const inputStyles = {
    margin: "0 0 2rem 0",
    width: "fit-content",
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
    store.getAllUsers().then(() => setUsers(store.allUsers));
    return () => setUsers(null);
  }, [store]);

  const filteredUsers = users?.filter((user) => {
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
        <AllUsers filteredUsers={filteredUsers} />
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

export default Users;
