import { FC } from "react";
import "./userSettings.css";
import { observer } from "mobx-react-lite";
import SettingsForm from "../../components/SettingsForm/SettingsForm";
import SettingsBtnsForm from "../../components/SettingsForm/SettingsBtnsForm";

const UserSettingsPage: FC = () => {
  return (
    <div className="settings__container">
      <h2 className="settings__title">Editing Profile</h2>
      <div className="settings__box">
        <SettingsBtnsForm />
        <hr />
        <SettingsForm />
      </div>
    </div>
  );
};

export default observer(UserSettingsPage);
