import { FC, useState, useContext } from "react";
import { Context } from "../../index";
import { Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Title from "../../components/Title/Title";
import "./loginForm.sass";

const LoginForm: FC = () => {
  const { store } = useContext(Context);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const inputStyles = {
    margin: "1.5rem 1.3rem 0.8rem 1.3rem",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "2rem 1.3rem 2rem 1.3rem",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <form className="login__form">
      <div className="title__box">
        <Title />
      </div>
      <div className="form__box">
        <h2 className="form__h2">Login</h2>
        <p className="error">{store.error}</p>
        <Input
          placeholder="Username"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          autoComplete="on"
          placeholder="Password"
          type="password"
          sx={inputStyles}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <Button
          variant="contained"
          sx={btnStyles}
          onClick={async () => {
            await store.login(username, password);
            store.checkAuth();
          }}
        >
          Sign In
        </Button>
        <div className="form__linkBox">
          <Link to="/registration" className="signUp">
            Sign Up
          </Link>
        </div>
      </div>
    </form>
  );
};

export default observer(LoginForm);
