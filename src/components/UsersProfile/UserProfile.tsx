import { FC, useContext } from "react";
import { Context } from "../../index";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import "./userProfile.css";
import UserPosts from "../UserPosts/UserPosts";

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const avatarSrc = store.user.avatar;
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
          {store.user.firstName}
        </Avatar>
        <ul className="profile__info">
        {store.user.city !== "" ? (
            <li className="profile__info__list">
              City: {store.user.city}
            </li>
          ) : null}
          {store.user.birthday ? (
            <li className="profile__info__list">
              My Birthday: {store.user.birthday.split("-").reverse().join(".")}
            </li>
          ) : null}
          {store.user.stack !== ""? (
            <li className="profile__info__list">Stack: {store.user.stack}</li>
          ) : null}
          {store.user.position !== "" ? (
            <li className="profile__info__list">
              Position: {store.user.position}
            </li>
          ) : null}
          {store.user.department !== "" ? (
            <li className="profile__info__list">
              Department: {store.user.department}
            </li>
          ) : null}
          {store.user.education !== "" ? (
            <li className="profile__info__list">
              Education: {store.user.education}
            </li>
          ) : null}
          {store.user.skype !== "" ? (
            <li className="profile__info__list">Skype: {store.user.skype}</li>
          ) : null}
          {store.user.phone ? (
            <li className="profile__info__list">Phone: {store.user.phone}</li>
          ) : null}
        </ul>
      </div>
      <div className="profile__second__column">
        <p className="profile__name">
          {store.user.firstName && store.user.lastName
            ? `${store.user.firstName} ${store.user.lastName}`
            : "I don't have a name"}
        </p>
        <p className="profile__about">
          {store.user.description !== ""
            ? `About me: ${store.user.description}`
            : "Nothing at now..."}
        </p>
        <UserPosts />
      </div>
    </div>
  );
};

export default observer(UserProfilePage);
