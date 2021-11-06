import React from "react";
import classes from "../styles/registrationForm.module.css";
import MyInput from "./UI/input/MyInput";
import MyButton from "./UI/button/MyButton";
import { Link } from "@mui/material";

const RegistrationForm = () => {
  return (
    <form className={classes.form}>
      <h2 className={classes.h2}>Registration</h2>
      <MyInput label="Email" />
      <MyInput label="Username" />
      <MyInput label="Password" />
      <MyButton value="Sign Up" variant={{ variant: "contained" }} />
      <div className={classes.linkBox}>
        <span>Have an account?</span>
        <Link href="#">Sign In</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
