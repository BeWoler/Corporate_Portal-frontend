import Header from "./Header";
import "../styles/app.css";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      <div className="main__box__container">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
