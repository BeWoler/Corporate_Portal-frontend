import "../styles/navBar.css";
import { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../index";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

const NavBar: FC = () => {
  const { store } = useContext(Context);
  if(!store.isAuth) {
    return null;
  }
  return (
    <nav>
      <ul className="nav__ul">
        <Link to="/" className="nav__li">
          <HomeIcon sx={{ color: "#bf4444", verticalAlign: "bottom" }} />
          Home
        </Link>
        <Link to="/private" className="nav__li">
          <SettingsIcon sx={{ color: "#bf4444", verticalAlign: "bottom" }} />
          Settings
        </Link>
        <Link to="/users" className="nav__li">
          <PeopleAltIcon sx={{ color: "#bf4444", verticalAlign: "bottom" }} />
          Our Users
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
