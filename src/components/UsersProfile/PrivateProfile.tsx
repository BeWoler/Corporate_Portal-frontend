import { FC, useContext } from "react";
import { Context } from "../../index";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { URL } from "../../http/axios";
import "./userProfile.css";
import SendMessage from "./SendMessage";
import AddFriend from "./AddFriend";

const PrivateProfile: FC = () => {
  const { store } = useContext(Context);
  const avatarSrc = `${URL}/${store.otherUser.avatar}`;
  const avatarStyles = {
    width: "235px",
    height: "235px",
    borderRadius: ".2rem",
    margin: "0 auto 1.5rem auto",
    backgroundColor: "#534ED9",
    boxShadow: "0px 1px 10px #3d3d3d",
    fontSize: "50px",
  };

  return (
    <div className="profile__container">
      <div className="profile__first__column">
        <Avatar variant="square" src={avatarSrc} sx={avatarStyles}>
          {store.otherUser.firstName}
        </Avatar>
        <AddFriend />
        <SendMessage />
      </div>
      <div className="profile__second__column">
        <p className="profile__name">
          {store.otherUser.firstName && store.otherUser.lastName
            ? `${store.otherUser.firstName} ${store.otherUser.lastName}`
            : "I don't have a name"}
        </p>
        <div className="profile__private">
          This profile is hidden from others
        </div>
      </div>
    </div>
  );
};

export default observer(PrivateProfile);
