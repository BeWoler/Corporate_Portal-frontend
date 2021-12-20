import { FC, useState, useContext } from "react";
import { Context } from "../../index";
import "./registrationForm.css";
import { Button, Input } from "@mui/material";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Title from "../../components/Title/Title";

const RegistrationPage: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const { store } = useContext(Context);

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
    <form className="registr__form">
      <div className="title__box">
        <Title />
      </div>
      <div className="form__box">
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
          placeholder="First Name"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          placeholder="Last Name"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setLastName(e.target.value);
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
            await store.registration(
              email,
              username,
              password,
              firstName,
              lastName
            );
            store.checkAuth();
          }}
        >
          Sign Up
        </Button>
        <div className="form__linkBox">
          <span>Have an account?</span>
          <Link to="/login">Sign In</Link>
        </div>
      </div>
    </form>
  );
};

export default observer(RegistrationPage);
