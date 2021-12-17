import { FC, useContext } from "react";
import { Context } from "../../index";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import { URL } from "../../http/axios";
import "./userProfile.css";
import OtherUserPosts from "../OtherUserPosts/OtherUserPosts";

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const avatarStyles = {
    width: "200px",
    height: "200px",
    margin: "0 0 1.5rem 0",
    backgroundColor: "#bf4444",
    fontSize: "50px",
  };

  return (
    <div className="profile__container">
      <div className="profile__first__column">
        <Avatar src={`${URL}/${store.otherUser.avatar}`} sx={avatarStyles}>
          {store.otherUser.firstName}
        </Avatar>
        <ul className="profile__info">
          {store.otherUser.birthday ? (
            <li className="profile__info__list">
              My Birthday:{" "}
              {store.otherUser.birthday.split("-").reverse().join(".")}
            </li>
          ) : null}
          {store.otherUser.stack ? (
            <li className="profile__info__list">
              Stack: {store.otherUser.stack}
            </li>
          ) : null}
          {store.otherUser.position ? (
            <li className="profile__info__list">
              Position: {store.otherUser.position}
            </li>
          ) : null}
          {store.otherUser.department ? (
            <li className="profile__info__list">
              Department: {store.otherUser.department}
            </li>
          ) : null}
          {store.otherUser.education ? (
            <li className="profile__info__list">
              Education: {store.otherUser.education}
            </li>
          ) : null}
          {store.otherUser.skype ? (
            <li className="profile__info__list">
              Skype: {store.otherUser.skype}
            </li>
          ) : null}
          {store.otherUser.phone ? (
            <li className="profile__info__list">
              Phone: {store.otherUser.phone}
            </li>
          ) : null}
        </ul>
      </div>
      <div className="profile__second__column">
        <p className="profile__name">
          {store.otherUser.firstName && store.otherUser.lastName
            ? `${store.otherUser.firstName} ${store.otherUser.lastName}`
            : "I don't have a name"}
        </p>
        <p className="profile__about">
          {store.otherUser.description
            ? `About me: ${store.otherUser.description}`
            : "Nothing at now..."}
        </p>
        <OtherUserPosts />
      </div>
    </div>
  );
};

export default observer(UserProfilePage);
