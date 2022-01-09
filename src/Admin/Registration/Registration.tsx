import { useState } from "react";
import { Button, Input, Switch } from "@mui/material";
import AdminService from "../Services/AdminService";
import "./registration.css";

interface RegistrationProps {
  getUsers: () => Promise<void>;
}

const Registration = ({ getUsers }: RegistrationProps) => {
  const [status, setStatus] = useState<string>(null);
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [role, setRole] = useState<string>("member");

  const inputStyles = {
    margin: "1.5rem 1.3rem 0.8rem 1.3rem",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "2rem 1.3rem 2rem 1.3rem",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const registration = async () => {
    const res = await AdminService.registration(
      username,
      email,
      password,
      firstName,
      lastName,
      role
    );
    if (res.status === 200) {
      setStatus("Success");
      setTimeout(() => setStatus(null), 2000);
    }
    await getUsers();
    setUsername("");
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
    setRole("");
  };

  return (
    <div className="admin__registration__box">
      <h3 className="admin__registration__title">New User Registration</h3>
      <h3 className="admin__success">{status ? status : null}</h3>
      <form className="admin__registration__form">
        <Input
          value={email}
          placeholder="Email"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <Input
          value={username}
          placeholder="Username"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <Input
          value={firstName}
          placeholder="First Name"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <Input
          value={lastName}
          placeholder="Last Name"
          type="text"
          sx={inputStyles}
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />
        <Input
          value={password}
          autoComplete="on"
          placeholder="Password"
          type="password"
          sx={inputStyles}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <div>
          <Switch
            inputProps={{ "aria-label": "controlled" }}
            onChange={(e) => {
              if (e.target.checked === true) {
                setRole("admin");
              } else {
                setRole("member");
              }
            }}
          />
          Admin
        </div>
        <Button
          disabled={
            username === "" ||
            email === "" ||
            password === "" ||
            firstName === "" ||
            lastName === ""
          }
          variant="contained"
          sx={btnStyles}
          onClick={registration}
        >
          Create User
        </Button>
      </form>
    </div>
  );
};

export default Registration;
