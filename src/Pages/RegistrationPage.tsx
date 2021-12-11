import { FC, useState, useContext } from "react";
import { Context } from "../index";
import "../styles/registrationForm.css";
import { Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const RegistrationPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { store } = useContext(Context);

  const inputStyles = {
    margin: "1.5rem 1.3rem 0.8rem 1.3rem",
    ":after": { borderBottom: "2px solid #bf4444" },
  };
  const btnStyles = {
    margin: "2rem 1.3rem 2rem 1.3rem",
    backgroundColor: "#bf4444",
    ":hover": { backgroundColor: "#bc6464" },
  };

  return (
    <form className="registr__form">
      <h2 className="form__h2">Join Us</h2>
      <p className="error">{store.error}</p>
      <Input
        placeholder="Email"
        type="text"
        sx={inputStyles}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <Input
        placeholder="Username"
        type="text"
        sx={inputStyles}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
      <Input
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
          await store.registration(email, username, password);
          store.checkAuth();
        }}
      >
        Sign Up
      </Button>
      <div className="form__linkBox">
        <span>Have an account?</span>
        <Link to="/login">Sign In</Link>
      </div>
    </form>
  );
};

export default observer(RegistrationPage);
