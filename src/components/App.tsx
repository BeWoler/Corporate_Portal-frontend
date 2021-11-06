import React from "react";
import classes from "../styles/app.module.css";
import LoginForm from "./LoginForm";
import RegistrationForm from "./RegistrationForm";

function App() {
  return <div className={classes.myDiv}>
    <LoginForm />
    <RegistrationForm />
  </div>;
}

export default App;
