import { useState, useEffect, useContext } from "react";
import { Context } from "../index";
import { User } from "../models/user";
import UserService from "../services/UserService";
import EditUser from "./Users/EditUser";
import Users from "./Users/Users";
import ChangeUserPassword from "./Users/ChangeUserPassword";
import ChangeUserAvatar from "./Users/ChangeUserAvatar";
import Registration from "./Registration/Registration";
import "./admin.sass";

const Admin = () => {
  const { store } = useContext(Context);
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>(store.user);

  const getUsers = async () => {
    const res = await UserService.fetchUsers("", 0);
    return setUsers(res.data.users);
  };

  useEffect(() => {
    getUsers();
    return () => setUsers(null);
  }, []);

  const getCurrentUser = (user: User) => {
    return setCurrentUser(user);
  };

  return (
    <div className="admin__box">
      <Users users={users} setUser={getCurrentUser} />
      <div className="admin__editUser">
        {currentUser === store.user ||
        currentUser._id === store.user.id ? null : (
          <EditUser currentUser={currentUser} getUsers={getUsers} />
        )}
        {currentUser === store.user ||
        currentUser._id === store.user.id ? null : (
          <ChangeUserPassword currentUser={currentUser} getUsers={getUsers} />
        )}
        {currentUser === store.user ||
        currentUser._id === store.user.id ? null : (
          <ChangeUserAvatar currentUser={currentUser} getUsers={getUsers} />
        )}
      </div>
      <Registration getUsers={getUsers} />
    </div>
  );
};

export default Admin;
