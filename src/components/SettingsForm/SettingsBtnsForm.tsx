import { FC, useContext } from "react";
import "./settingsForm.css";
import { Link } from "react-router-dom";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const SettingsBtnsForm: FC = () => {
  const { store } = useContext(Context);
  return (
    <form className="settings__form">
      <Link className="settings__btn" to="password">
        Change Password
      </Link>
      <Link className="settings__btn" to="avatar">
        Change Avatar
      </Link>
      <Link className="settings__btn" to="#" onClick={() => store.delete()}>
        Delete Profile
      </Link>
    </form>
  );
};

export default observer(SettingsBtnsForm);
