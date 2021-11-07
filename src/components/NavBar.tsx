import classes from "../styles/navBar.module.css";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul className={classes.ul}>
        <Link to="/main" className={classes.li}>
          Main
        </Link>
        <Link to="/private" className={classes.li}>
          Private
        </Link>
      </ul>
    </nav>
  );
};

export default NavBar;
