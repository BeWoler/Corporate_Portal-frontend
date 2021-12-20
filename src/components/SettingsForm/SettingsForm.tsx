import { FC, useContext, useState } from "react";
import "./settingsForm.css";
import { Button, Input } from "@mui/material";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";

const SettingsForm: FC = () => {
  const { store } = useContext(Context);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [stack, setStack] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [education, setEducation] = useState<string>();
  const [skype, setSkype] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [description, setDescription] = useState<string>();

  const inputStyles = {
    margin: "0 0 1rem 0",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "2rem auto 2rem auto",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <form className="settings__form">
      <h3 className="settings__notification">{store.successMessage}</h3>
      <div className="settings__data">
        <div className="settings__mainData">
          <h4 className="settings__title">Edit personal info</h4>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Age"
            type="date"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setPhone(+e.target.value)}
            placeholder="Phone"
            type="number"
            sx={inputStyles}
          />
        </div>
        <div className="settings__otherData">
          <h4 className="settings__title">Edit other info</h4>
          <Input
            onChange={(e) => setStack(e.target.value)}
            multiline={true}
            placeholder="Stack"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setEducation(e.target.value)}
            multiline={true}
            placeholder="Education"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setSkype(e.target.value)}
            placeholder="Skype"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            multiline={true}
            sx={inputStyles}
          />
        </div>
      </div>
      <Button
        onClick={async () => {
          await store.editProfile(store.user.username, {
            firstName,
            lastName,
            birthday,
            stack,
            position,
            department,
            education,
            skype,
            phone,
            description,
          });
          store.checkAuth();
        }}
        variant="contained"
        sx={btnStyles}
      >
        Save Changes
      </Button>
    </form>
  );
};

export default observer(SettingsForm);
