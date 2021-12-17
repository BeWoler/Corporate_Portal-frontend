import { FC } from "react";
import Header from "../Header/Header";
import "../App/app.css"
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar";

const Layout: FC = () => {
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