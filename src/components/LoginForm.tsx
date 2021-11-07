import React, { FC, useState } from "react";
import classes from "../styles/loginForm.module.css";
import { Button, Link, TextField } from "@mui/material";

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className={classes.form}>
      <h2 className={classes.h2}>Sign In</h2>
      <TextField
        label="Username"
        type="text"
        sx={{ margin: "1.5rem 1.3rem 0.8rem 1.3rem" }}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <TextField
        label="Password"
        type="password"
        sx={{ margin: "1.5rem 1.3rem 0.8rem 1.3rem" }}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <Button variant="contained" sx={{ margin: "2rem 1.3rem 2rem 1.3rem" }}>
        Sign In
      </Button>
      <div className={classes.linkBox}>
        <Link href="#">Sign Up</Link>
        <Link href="#">Forgot Password?</Link>
      </div>
    </form>
  );
};

export default LoginForm;
