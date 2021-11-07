import React, { FC, useState } from "react";
import classes from "../styles/registrationForm.module.css";
import { Link, TextField, Button } from "@mui/material";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <form className={classes.form}>
      <h2 className={classes.h2}>Registration</h2>
      <TextField
        label="Email"
        type="text"
        sx={{ margin: "1.5rem 1.3rem 0.8rem 1.3rem" }}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <TextField
        label="Username"
        type="password"
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
        <span>Have an account?</span>
        <Link href="#">Sign In</Link>
      </div>
    </form>
  );
};

export default RegistrationForm;
