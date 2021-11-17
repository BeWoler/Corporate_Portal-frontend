import { FC, useContext } from "react";
import "../styles/header.css";
import { Link } from "react-router-dom";
import { Context } from "../index";
import ApiIcon from '@mui/icons-material/Api';
import UserBar from "./UserBar";
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
        <div className="header__logo">
        <ApiIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem", width: "1.8rem", height: "1.8rem" }} />
        <p className="header__title"><Link to="/">Corporate Portal</Link></p>
        </div>
        <div>
          <Link to="/login">Sign In</Link>
          <Link to="/registration">Sign Up</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
