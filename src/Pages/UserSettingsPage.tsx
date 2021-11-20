import { FC, useContext, useState } from "react";
import "../styles/userSettings.css";
import { Button, Input } from "@mui/material";
import { Context } from "../index";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";

const UserSettingsPage: FC = () => {
  const { store } = useContext(Context);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<Date>();
  const [stack, setStack] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [education, setEducation] = useState<string>();
  const [skype, setSkype] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [description, setDescription] = useState<string>();

  return (
    <div className="settings__container">
      <h2 className="settings__title">Editing Profile</h2>
      <div className="settings__box">
        <form className="settings__form">
          <h3 className="settings__notification">{store.successMessage}</h3>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setBirthday(new Date(e.target.value))}
            placeholder="Age"
            type="date"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setStack(e.target.value)}
            multiline={true}
            placeholder="Stack"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setEducation(e.target.value)}
            multiline={true}
            placeholder="Education"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setSkype(e.target.value)}
            placeholder="Skype"
            type="text"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setPhone(+e.target.value)}
            placeholder="Phone"
            type="number"
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            multiline={true}
            sx={{
              margin: "0rem 1.3rem 1rem 1.3rem",
              ":after": { borderBottom: "2px solid #bf4444" },
            }}
          />
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
            sx={{
              margin: "2rem 1.3rem 2rem 1.3rem",
              backgroundColor: "#bf4444",
              ":hover": {
                backgroundColor: "#bc6464",
              },
            }}
          >
            Save
          </Button>
        </form>
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
      </div>
    </div>
  );
};

export default observer(UserSettingsPage);
