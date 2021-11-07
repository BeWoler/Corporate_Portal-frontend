import { useEffect, useContext } from "react";
import classes from "../styles/app.module.css";
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
    return <div></div>;
  }

  const checkAuth = () => {
    if (store.isAuth) {
      return console.log();
    }
  };

  return (
    <div className={classes.myDiv}>
      {checkAuth()}
      <Header />
      <AppRouter />
    </div>
  );
};

export default observer(App);
