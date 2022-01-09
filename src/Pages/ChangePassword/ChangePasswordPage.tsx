import { FC, useState, useContext } from "react";
import { Input, Button } from "@mui/material";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import "./changePassword.css";

const ChangePasswordPage: FC = () => {
  const { store } = useContext(Context);
  const [oldPassword, setOldPassword] = useState<string>();
  const [newPassword, setNewPassword] = useState<string>();

  const inputStyles = {
    margin: "1rem 1.3rem 2rem 1.3rem",
    width: "400px",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "0 auto",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <div className="change__container">
      <h2 className="change__title">Change Password</h2>
      <form className="change__form">
        <h3 className="error">{store.error}</h3>
        <h4>Enter your old password</h4>
        <Input
          placeholder="Old Password"
          required
          type="password"
          sx={inputStyles}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <h4>Enter your new password</h4>
        <Input
          placeholder="New Password"
          required
          type="password"
          sx={inputStyles}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <Button
          variant="contained"
          sx={btnStyles}
          onClick={async () => {
            await store.changePass(
              store.user.id,
              newPassword,
              oldPassword
            );
            if (!store.error) store.logout();
          }}
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default observer(ChangePasswordPage);
