import { Avatar } from "@mui/material";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../index";
import { URL } from "../http/axios";
import "../styles/userBar.css";

const UserBar: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="userBar__container">
      <Link className="userBar__user" to={`${store.user.username}/profile`}>
      {store.user.email}
      <Avatar
        src={`${URL}/${store.user.avatar}`}
        className="avatar"
        sx={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
          marginLeft: "0.5rem",
          bgcolor: "#bf4444",
        }}
      ></Avatar>
      </Link>
    </div>
  );
};

export default UserBar;
