import "../styles/navBar.css";
import { FC, useContext } from 'react';
import { Link } from "react-router-dom";
import { Context } from "../index";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';

const NavBar: FC = () => {
  const { store } = useContext(Context);
  if(!store.isAuth) {
    return null;
  }
  return (
    <nav>
      <ul className="nav__ul">
        <Link to={`${store.user.username}/profile`} className="nav__li">
          <PersonIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          My Profile
        </Link>
        <Link to="friends" className="nav__li">
          <ImportContactsIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Friends
        </Link>
        <Link to="board" className="nav__li">
          <DashboardIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Board
        </Link>
        <Link to="chat" className="nav__li">
          <ChatIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Messages
        </Link>
        <Link to="users" className="nav__li">
          <PeopleAltIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Users
        </Link>
        <Link to="settings" className="nav__li">
          <SettingsIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Settings
        </Link>
        <Link to="/login" className="nav__li" onClick={() => store.logout()}>
          <LogoutIcon sx={{ color: "#bf4444", verticalAlign: "bottom", marginRight: ".4rem" }} />
          Logout
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
