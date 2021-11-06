import React from "react";
import classes from "../styles/loginForm.module.css";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { Link } from "@mui/material";

const LoginForm = () => {
  return (
    <form className={classes.form}>
      <h2 className={classes.h2}>Sign In</h2>
      <MyInput label="Username" />
      <MyInput label="Password" />
      <MyButton value="Sign In" variant={{ variant: "contained" }} />
      <div className={classes.linkBox}>
        <Link href="#">Sign Up</Link>
        <Link href="#">Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
