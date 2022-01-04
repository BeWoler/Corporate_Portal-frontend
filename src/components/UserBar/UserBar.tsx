import { Avatar } from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import "./userBar.css";

const UserBar: FC = () => {
  const { store } = useContext(Context);
  const avatarStyles = {
    cursor: "pointer",
    width: "30px",
    height: "30px",
    marginLeft: "0.5rem",
    bgcolor: "#534ED9",
  };

  return (
    <div className="userBar__container">
      <Link className="userBar__user" to={`profile/${store.user.id}`}>
        {store.user.email}
        <Avatar
          src={store.user.avatar}
          className="avatar"
          sx={avatarStyles}
        ></Avatar>
      </Link>
    </div>
  );
};

export default UserBar;
