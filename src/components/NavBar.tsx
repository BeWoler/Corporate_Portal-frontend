import "../styles/navBar.css";
import { Link } from "react-router-dom";
import { Input } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";

const NavBar = () => {
  return (
    <nav>
      <ul className="nav__ul">
        <Link to="/main" className="nav__li">
          <HomeIcon sx={{ color: "#D65A3E", verticalAlign: "bottom" }} />
          Home
        </Link>
        <Link to="/private" className="nav__li">
          <SettingsIcon sx={{ color: "#D65A3E", verticalAlign: "bottom" }} />
          Settings
        </Link>
        <Input
          placeholder="Search"
          sx={{
            marginLeft: "1rem",
            ":after": { borderBottom: "2px solid #D65A3E" },
          }}
        />
      </ul>
    </nav>
  );
};

export default NavBar;
