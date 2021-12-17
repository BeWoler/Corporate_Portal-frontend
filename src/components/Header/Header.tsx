import { FC, useContext } from "react";
import "./header.css";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import ApiIcon from "@mui/icons-material/Api";
import { Input } from "@mui/material";
import UserBar from "../UserBar/UserBar";

const Header: FC = () => {
  const { store } = useContext(Context);
  const apiIconStyles = {
    color: "#bf4444",
    verticalAlign: "bottom",
    marginRight: ".4rem",
    width: "1.8rem",
    height: "1.8rem",
  };
  const inputStyles = {
    marginLeft: "4rem",
    ":after": { borderBottom: "2px solid #bf4444" },
  };

  if (store.isAuth) {
    return (
      <header className="header">
        <div className="header__main">
          <div className="header__logo">
            <ApiIcon sx={apiIconStyles} />
            <p className="header__title">
              <Link to="/">Corporate Portal</Link>
            </p>
            <Input placeholder="Search" sx={inputStyles} />
          </div>
          <UserBar />
        </div>
      </header>
    );
  }

  return (
    <header className="header">
      <div className="header__main nonAuth">
        <div className="header__logo">
          <ApiIcon sx={apiIconStyles} />
          <p className="header__title">
            <Link to="/">Corporate Portal</Link>
          </p>
        </div>
        <div className="header__signBtns">
          <Link to="login">Sign In</Link>
          <Link to="registration">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
