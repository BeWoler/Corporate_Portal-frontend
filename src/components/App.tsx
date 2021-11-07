import { useEffect, useContext } from "react";
import classes from "../styles/app.module.css";
import LoginForm from "./LoginForm";
// import RegistrationForm from "./RegistrationForm";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import Header from "./Header";

const App = () => {
  const { store } = useContext(Context);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      store.checkAuth();
    }
  }, [store]);

  if(!store.isAuth) {
    return <div>
    <Header /> 
    <LoginForm />
    </div>
  }

  return (
    <div className={classes.myDiv}>
      <Header />
      <h1 className={classes.h1}>{store.isAuth ?  `Welcome ${store.user.username}!` : 'Unauthorized'}</h1>
    </div>
  );
};

export default observer(App);
