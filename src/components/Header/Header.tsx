import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import ApiIcon from "@mui/icons-material/Api";
import UserBar from "../UserBar/UserBar";
import "./header.sass";

const Header: FC = () => {
  const { store } = useContext(Context);
  const apiIconStyles = {
    color: "#534ED9",
    verticalAlign: "bottom",
    marginRight: ".4rem",
    width: "1.8rem",
    height: "1.8rem",
  };

  if (store.isAuth) {
    return (
      <header className="header">
        <div className="header__main">
          <div className="header__logo">
            <ApiIcon sx={apiIconStyles} />
            <p className="header__title">
              <Link to="/board">Corporate Portal</Link>
            </p>
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
