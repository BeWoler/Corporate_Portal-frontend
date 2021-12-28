import { FC, useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { Avatar } from "@mui/material";
import { observer } from "mobx-react-lite";
import "./userProfile.css";
import OtherUserPosts from "../OtherUserPosts/OtherUserPosts";
import AddFriend from "./AddFriend";
import PrivateProfile from "./PrivateProfile";
import UserFriends from "../UserFriends/UserFriends";
import SendMessage from "./SendMessage";

const OtherUserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const [active, setActive] = useState<boolean>(false);
  const avatarSrc = store.otherUser.avatar;
  const currentId = window.location.href.split("/").reverse()[0];
  const avatarStyles = {
    width: "235px",
    height: "235px",
    borderRadius: ".2rem",
    margin: "0 auto 1.5rem auto",
    backgroundColor: "#534ED9",
    boxShadow: "0px 1px 10px #3d3d3d",
    fontSize: "50px",
  };

  useEffect(() => {
    if (store.user.friends) {
      store.user.friends.forEach((friendId: any) => {
        if (friendId._id === currentId) {
          setActive(true);
        }
      });
    }
  }, [currentId, store.user.friends]);

  if (store.otherUser.privatePage) {
    return <PrivateProfile />;
  }

  return (
    <div className="profile__container">
      <div className="profile__first__column">
        <Avatar variant="square" src={avatarSrc} sx={avatarStyles}>
          {store.otherUser.firstName}
        </Avatar>
        {active ? (
          <AddFriend disabled={true} />
        ) : (
          <AddFriend disabled={false} />
        )}
        <SendMessage />
        <ul className="profile__info">
          {store.otherUser.birthday ? (
            <li className="profile__info__list">
              My Birthday:{" "}
              {store.otherUser.birthday.split("-").reverse().join(".")}
            </li>
          ) : null}
          {store.otherUser.stack !== "" ? (
            <li className="profile__info__list">
              Stack: {store.otherUser.stack}
            </li>
          ) : null}
          {store.otherUser.position !== "" ? (
            <li className="profile__info__list">
              Position: {store.otherUser.position}
            </li>
          ) : null}
          {store.otherUser.department !== "" ? (
            <li className="profile__info__list">
              Department: {store.otherUser.department}
            </li>
          ) : null}
          {store.otherUser.education !== "" ? (
            <li className="profile__info__list">
              Education: {store.otherUser.education}
            </li>
          ) : null}
          {store.otherUser.skype !== "" ? (
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
        {store.otherUser.friends ? (
          <UserFriends friends={store.otherUser.friends} />
        ) : null}
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

export default observer(OtherUserProfilePage);
