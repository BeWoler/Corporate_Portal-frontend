import React, { FC, useContext, useState } from "react";
import "../styles/userSettings.css";
import { Button, Input, Avatar } from "@mui/material";
import { Context } from "../index";
import { Link, Navigate } from "react-router-dom";

const UserSettings: FC = () => {
  const { store } = useContext(Context);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [age, setAge] = useState<number>();
  const [description, setDescription] = useState<string>();

  return (
    <div className="settings__container">
      <h2 className="settings__title">Settigns</h2>
      <div className="settings__info">
        <Avatar
          sx={{
            marginRight: "1rem",
            bgcolor: "#D65A3E",
          }}
        ></Avatar>
        {store.user.email}
      </div>
      <div className="settings__box">
        <form className="settings__form">
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            type="text"
            sx={{
              margin: "1.5rem 1.3rem 0.8rem 1.3rem",
              ":after": { borderBottom: "2px solid #D65A3E" },
            }}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            sx={{
              margin: "1.5rem 1.3rem 0.8rem 1.3rem",
              ":after": { borderBottom: "2px solid #D65A3E" },
            }}
          />
          <Input
            onChange={(e) => setAge(parseFloat(e.target.value))}
            placeholder="Age"
            type="number"
            sx={{
              margin: "1.5rem 1.3rem 0.8rem 1.3rem",
              ":after": { borderBottom: "2px solid #D65A3E" },
            }}
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            sx={{
              margin: "1.5rem 1.3rem 0.8rem 1.3rem",
              ":after": { borderBottom: "2px solid #D65A3E" },
            }}
          />
          <Button
            onClick={async () => {
              await store.editProfile(store.user.username, {
                firstName,
                lastName,
                age,
                description,
              });
              store.checkAuth();
            }}
            variant="contained"
            sx={{
              margin: "2rem 1.3rem 2rem 1.3rem",
              backgroundColor: "#D65A3E",
              ":hover": {
                backgroundColor: "#B04A33",
              },
            }}
          >
            Save
          </Button>
        </form>
        <form className="settings__form">
          <p className="settings__paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            minus blanditiis doloribus sed officiis in sit est at impedit
            voluptatem corporis, iusto harum laboriosam ab numquam quo! Vel, non
            iste?
          </p>
          <Link className="settings__btn" to="changepass">
            Change Password
          </Link>
          <p className="settings__paragraph">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
            minus blanditiis doloribus sed officiis in sit est at impedit
            voluptatem corporis, iusto harum laboriosam ab numquam quo! Vel, non
            iste?
          </p>
          <Link className="settings__btn" to="#" onClick={() => store.delete()}>
            Delete Profile
          </Link>
        </form>
      </div>
    </div>
  );
};

export default UserSettings;
