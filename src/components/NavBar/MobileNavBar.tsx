import { FC, useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import SettingsIcon from "@mui/icons-material/Settings";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import ChatIcon from "@mui/icons-material/Chat";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import "./mobileNavBar.sass";

const MobileNavBar: FC = () => {
  const { store } = useContext(Context);
  const mobileNav = useRef<HTMLUListElement>(null);
  const burger = useRef<HTMLSpanElement>(null);
  const linkStyle = {
    color: "#534ED9",
    verticalAlign: "bottom",
    marginRight: ".4rem",
  };

  if (!store.isAuth) {
    return null;
  }

  const changeNav = () => {
    if (burger.current?.classList.contains("toggle")) {
      burger.current?.classList.replace("toggle", "toggled");
      return mobileNav.current?.classList.replace("closed", "opened");
    } else {
      burger.current?.classList.replace("toggled", "toggle");
      return mobileNav.current?.classList.replace("opened", "closed");
    }
  };

  const closeMenu = () => {
    burger.current?.classList.replace("toggled", "toggle");
    return mobileNav.current?.classList.replace("opened", "closed");
  };

  return (
    <nav>
      <span
        className="mobile__burger toggle"
        onClick={changeNav}
        ref={burger}
      ></span>
      <ul className="mobile__nav__ul closed" ref={mobileNav}>
        <Link
          to={`profile/${store.user.id}`}
          className="mobile__nav__li"
          onClick={closeMenu}
        >
          <PersonIcon sx={linkStyle} />
          My Profile
        </Link>
        <Link
          to={`friends/${store.user.id}`}
          className="mobile__nav__li"
          onClick={closeMenu}
        >
          <ImportContactsIcon sx={linkStyle} />
          Friends
        </Link>
        <Link to="board" className="mobile__nav__li" onClick={closeMenu}>
          <DashboardIcon sx={linkStyle} />
          Board
        </Link>
        <Link to="chat" className="mobile__nav__li" onClick={closeMenu}>
          <ChatIcon sx={linkStyle} />
          Messages
        </Link>
        <Link to="users" className="mobile__nav__li" onClick={closeMenu}>
          <PeopleAltIcon sx={linkStyle} />
          Users
        </Link>
        <Link to="settings" className="mobile__nav__li" onClick={closeMenu}>
          <SettingsIcon sx={linkStyle} />
          Settings
        </Link>
        <Link
          to="/login"
          className="mobile__nav__li"
          onClick={() => {
            closeMenu();
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

export default MobileNavBar;
