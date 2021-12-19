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
    margin: "1rem 1.3rem 0.8rem 1.3rem",
    ":after": { borderBottom: "2px solid #bf4444" },
  };
  const btnStyles = {
    margin: "0rem 2rem 0rem 2rem",
    backgroundColor: "#bf4444",
    ":hover": { backgroundColor: "#bc6464" },
  };

  return (
    <div className="change__container">
      <h2 className="change__title">Change Password</h2>
      <form className="change__form">
        <div>
          <h3 className="error">{store.error}</h3>
          <Input
            placeholder="Old Password"
            required
            type="password"
            sx={inputStyles}
            onChange={(e) => setOldPassword(e.target.value)}
          />
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
                store.user.username,
                newPassword,
                oldPassword
              );
              if (!store.error) store.logout();
            }}
          >
            Change Password
          </Button>
        </div>
      </form>
    </div>
  );
};

export default observer(ChangePasswordPage);
