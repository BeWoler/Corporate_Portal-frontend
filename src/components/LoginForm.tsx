import { FC, useState, useContext } from "react";
import { Context } from "../index";
import classes from "../styles/loginForm.module.css";
import { Button, TextField } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const LoginForm: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  return (
    <form className={classes.form}>
      <h2 className={classes.h2}>Login</h2>
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
          await store.login(username, password);
          store.checkAuth();
        }}
      >
        Sign In
      </Button>
      <div className={classes.linkBox}>
        <Link to="/registration">Sign Up</Link>
      </div>
    </form>
  );
};

export default observer(LoginForm);
