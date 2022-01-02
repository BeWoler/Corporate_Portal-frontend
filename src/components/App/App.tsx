import { useEffect, useContext } from "react";
import "./app.css";
import { observer } from "mobx-react-lite";
import { Context } from "../../index";
import AppRouter from "../../routes/AppRouter";
import Header from "../Header/Header";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  if (store.isLoading) {
    return (
      <div className="main__box">
      <Header />
    </div>
    );
  }

  return (
    <div className="main__box">
      <AppRouter />
    </div>
  );
};

export default observer(App);
