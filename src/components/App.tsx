import { useEffect, useContext } from "react";
import "../styles/app.css";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import AppRouter from "./AppRouter";
import Header from "./Header";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return <></>;
  }

  const checkAuth = () => {
    if (store.isAuth) {
      return console.log();
    }
  };

  return (
    <div className="main__box">
      {checkAuth()}
      <Header />
      <div className="main__box__container">
        <AppRouter />
      </div>
    </div>
  );
};

export default observer(App);
