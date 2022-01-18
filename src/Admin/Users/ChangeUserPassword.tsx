import { useState } from "react";
import { Input, Button } from "@mui/material";
import { User } from "../../models/user";
import AdminService from "../Services/AdminService";
import "./changeUserPassword.sass";

interface ChangeUserPasswordProps {
  currentUser: User;
  getUsers: () => Promise<void>;
}

const ChangeUserPassword = ({
  currentUser,
  getUsers,
}: ChangeUserPasswordProps) => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [status, setStatus] = useState<string>(null);

  const inputStyles = {
    margin: "1rem 0 2rem 0",
    width: "400px",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "0 auto",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const changePass = async () => {
    const res = await AdminService.changePassword(currentUser._id, newPassword);
    if (res.status === 200) {
      setStatus("Success");
      setTimeout(() => setStatus(null), 2000);
    }
    await getUsers();
    setNewPassword("");
  };

  return (
    <div className="changeUserPassword__container">
      <form className="changeUserPassword__form">
        <h3 className="changeUserPassword__title">Change User Password</h3>
        <h3 className="admin__success">{status ? status : null}</h3>
        <h4>Enter a new user password</h4>
        <Input
          value={newPassword}
          autoComplete="on"
          placeholder="New Password"
          required
          type="password"
          sx={inputStyles}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button disabled={newPassword === ''} variant="contained" sx={btnStyles} onClick={changePass}>
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangeUserPassword;
