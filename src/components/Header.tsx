import { FC, useContext } from "react";
import "../styles/header.css";
import UserBar from "./UserBar";
import { Context } from "../index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import NavBar from "./NavBar";

const Header: FC = () => {
  const { store } = useContext(Context);

  if (store.isAuth) {
    return (
      <header className="header">
        <div className="header__main">
          <NavBar />
          <UserBar />
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__main nonAuth">
        <div>
          <Button
            variant="contained"
            onClick={() => store.checkAuth()}
            sx={{
              margin: "-0.2rem 0 0 1rem",
              height: "1.5rem",
              backgroundColor: "#D65A3E",
              ":hover": {
                backgroundColor: "#B04A33"
              }
            }}
          >
            Refresh Tokens
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
