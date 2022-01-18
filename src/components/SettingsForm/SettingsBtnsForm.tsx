import { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import "./settingsForm.sass";

const SettingsBtnsForm: FC = () => {
  const { store } = useContext(Context);
  return (
    <form className="settings__btnForm">
      <Link className="settings__btn" to="password">
        Change Password
      </Link>
      <Link className="settings__btn" to="avatar">
        Change Avatar
      </Link>
      <Link
        className="settings__btn"
        to="/login"
        onClick={async () => {
          await store.delete();
          await store.checkAuth();
        }}
      >
        Delete Profile
      </Link>
    </form>
  );
};

export default observer(SettingsBtnsForm);
