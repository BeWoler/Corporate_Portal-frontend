import { Avatar } from "@mui/material";
import { FC, useContext } from "react";
import { Context } from "../index";
import "../styles/userBar.css";

const UserBar: FC = () => {
  const { store } = useContext(Context);

  return (
    <div className="userBar__container">
      {store.user.email}
      <Avatar
        onClick={() => store.logout()}
        sx={{
          cursor: "pointer",
          width: "30px",
          height: "30px",
          marginLeft: "0.5rem",
          bgcolor: "#D65A3E",
        }}
      ></Avatar>
    </div>
  );
};

export default UserBar;
