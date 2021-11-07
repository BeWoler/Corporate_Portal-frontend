import { FC, useState, useContext } from "react";
import { Context } from "../index";
import classes from "../styles/registrationForm.module.css";
import { TextField, Button } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const RegistrationForm: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

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
      <Button
        variant="contained"
        sx={{ margin: "2rem 1.3rem 2rem 1.3rem" }}
        onClick={async () => {
          await store.registration(email, username, password);
          store.checkAuth();
        }}
      >
        Sign Up
      </Button>
      <div className={classes.linkBox}>
        <span>Have an account?</span>
        <Link to="/login">Sign In</Link>
      </div>
    </form>
  );
};

export default observer(RegistrationForm);
