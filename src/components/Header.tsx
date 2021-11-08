import { FC, useContext } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import UserBar from "./UserBar";
import { Context } from "../index";
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
        <Link to="/login">Sign In</Link>
        <Link to="/registration">Sign Up</Link>
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
