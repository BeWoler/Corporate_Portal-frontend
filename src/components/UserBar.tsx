import { Avatar } from "@mui/material";
import { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../index";
import "../styles/userBar.css";

const UserBar: FC = () => {
  const { store } = useContext(Context);
  const [open, setOpen] = useState(false);

  return (
    <div className="userBar__container">
      {store.user.email}
      <Avatar
        onClick={() => open ? setOpen(false) : setOpen(true)}
        className="avatar"
        sx={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
          marginLeft: "0.5rem",
          bgcolor: "#D65A3E",
        }}
      ></Avatar>
      <ul className={open ? "menu__ul open" : "menu__ul close"}>
        <li className="menu__li"><Link to={`${store.user.username}/profile`}>Profile</Link></li>
        <li className="menu__li"><Link to="settings">Settings</Link></li>
        <li className="menu__li" onClick={() => store.logout()}><Link to="#">Logout</Link></li>
      </ul>
    </div>
  );
};

export default UserBar;
