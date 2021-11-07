import { FC, useContext } from "react";
import classes from "../styles/header.module.css";
import UserBar from "./UserBar";
import { Context } from "../index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";

const Header: FC = () => {
  const { store } = useContext(Context);

  const checkAuth = () => {
    if (store.isAuth) {
      return <UserBar />;
    }
    return (
      <div>
        <Link to="/login">Sign In</Link>
        <Link to="/registration">Sign Up</Link>
        <Button
          variant="contained"
          color="error"
          onClick={() => store.checkAuth()}
          sx={{
            margin: "-0.2rem 0 0 1rem",
            height: "1.5rem",
          }}
        >
          Refresh Tokens
        </Button>
      </div>
    );
  };
  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.ul}>
          <li className={classes.li}>Main</li>
          <li className={classes.li}>Main</li>
          <li className={classes.li}>Main</li>
        </ul>
      </nav>
      {checkAuth()}
    </header>
  );
};

export default Header;
