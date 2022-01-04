import "./navBar.css";
import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";

const NavBar: FC = () => {
  const { store } = useContext(Context);
  const linkStyle = {
    color: "#534ED9",
    verticalAlign: "bottom",
    marginRight: ".4rem",
  };

  if (!store.isAuth) {
    return null;
  }
  return (
    <nav>
      <ul className="nav__ul">
        <Link to={`profile/${store.user.id}`} className="nav__li">
          <PersonIcon sx={linkStyle} />
          My Profile
        </Link>
        <Link to={`friends/${store.user.id}`} className="nav__li">
          <ImportContactsIcon sx={linkStyle} />
          Friends
        </Link>
        <Link to="board" className="nav__li">
          <DashboardIcon sx={linkStyle} />
          Board
        </Link>
        <Link to="chat" className="nav__li">
          <ChatIcon sx={linkStyle} />
          Messages
        </Link>
        <Link to="users" className="nav__li">
          <PeopleAltIcon sx={linkStyle} />
          Users
        </Link>
        <Link to="settings" className="nav__li">
          <SettingsIcon sx={linkStyle} />
          Settings
        </Link>
        <Link
          to="/login"
          className="nav__li"
          onClick={() => {
            store.logout();
          }}
        >
          <LogoutIcon sx={linkStyle} />
          Logout
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
