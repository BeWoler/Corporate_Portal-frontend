import { FC } from "react";
import Header from "../Header/Header";
import "../App/app.css";
import { Outlet, useLocation } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout: FC = () => {
  const location = useLocation();
  if (location.pathname === "/admin") {
    return (
      <>
        <Header />
        <div className="admin__box__container">
          <div className="admin__box__outlet">
            <Outlet />
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <Header />
      <div className="main__box__container">
        <NavBar />
        <div className="main__box__outlet">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
