import { FC, useContext, useState, useEffect } from "react";
import { Context } from "../../index";
import { Avatar, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import AddFriend from "./AddFriend";
import PrivateProfile from "./PrivateProfile";
import UserFriends from "../UserFriends/UserFriends";
import SendMessage from "./SendMessage";
import UserService from "../../services/UserService";
import UserPosts from "../UserPosts/UserPosts";
import Loading from "../Loading/Loading";
import "./userProfile.sass";
import "./mobileUserProfile.sass";

const OtherUserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const [active, setActive] = useState<boolean>(false);
  const [blocked, setBlocked] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const avatarSrc = store.otherUser.avatar;
  const currentId = location.pathname.split("/").reverse()[0];
  const block: string[] = store.otherUser.blockedUser;
  const avatarStyles = {
    width: "235px",
    height: "235px",
    borderRadius: ".2rem",
    margin: "0 auto 1.5rem auto",
    backgroundColor: "#534ED9",
    boxShadow: "0px 1px 10px #3d3d3d",
    fontSize: "50px",
  };

  const btnStyles = {
    width: "fit-content",
    height: "fit-content",
    margin: "0",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  useEffect(() => {
    let timer = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (store.user.friends) {
      store.user.friends.forEach((friendId: any) => {
        if (friendId._id === currentId) {
          setActive(true);
        }
      });
    }
  }, [currentId, store.user.friends]);

  useEffect(() => {
    if (store.user.blockedUser?.includes(store.otherUser.id)) {
      setBlocked(true);
      return () => setBlocked(false);
    }
    return () => setBlocked(false);
  }, [store.otherUser.id, store.user.blockedUser]);

  if (loading === true) {
    return <Loading />;
  }
  if (store.otherUser.privatePage) {
    return <PrivateProfile />;
  }
  if (block && block.includes(store.user.id)) {
    return <PrivateProfile />;
  }

  return (
    <>
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
                Phone: +{store.otherUser.phone}
              </li>
            ) : null}
          </ul>
          {store.otherUser.friends ? (
            <UserFriends friends={store.otherUser.friends} />
          ) : null}
        </div>
        <div className="profile__second__column">
          <p className="profile__name">
            <span>
              {store.otherUser.firstName && store.otherUser.lastName
                ? `${store.otherUser.firstName} ${store.otherUser.lastName}`
                : "I don't have a name"}
            </span>
            {blocked ? (
              <Button
                sx={btnStyles}
                variant="contained"
                onClick={async () => {
                  await UserService.unblockUser(
                    store.user.id,
                    store.otherUser.id
                  );
                  await store.checkAuth();
                }}
              >
                Unblock User
              </Button>
            ) : (
              <Button
                sx={btnStyles}
                variant="contained"
                onClick={async () => {
                  await UserService.blockUser(
                    store.user.id,
                    store.otherUser.id
                  );
                  await store.checkAuth();
                }}
              >
                Block User
              </Button>
            )}
          </p>
          <p className="profile__about">
            {store.otherUser.description
              ? `About me: ${store.otherUser.description}`
              : "Nothing at now..."}
          </p>
          <UserPosts />
        </div>
      </div>
      <div className="mobile__profile__container">
        <div className="mobile__profile__column">
          <Avatar variant="square" src={avatarSrc} sx={avatarStyles}>
            {store.otherUser.firstName}
          </Avatar>
          <p className="mobile__profile__name">
            {store.otherUser.firstName && store.otherUser.lastName
              ? `${store.otherUser.firstName} ${store.otherUser.lastName}`
              : "I don't have a name"}
          </p>
          {active ? (
            <AddFriend disabled={true} />
          ) : (
            <AddFriend disabled={false} />
          )}
          <SendMessage />
          {blocked ? (
            <Button
              sx={btnStyles}
              variant="contained"
              onClick={async () => {
                await UserService.unblockUser(
                  store.user.id,
                  store.otherUser.id
                );
                await store.checkAuth();
              }}
            >
              Unblock User
            </Button>
          ) : (
            <Button
              sx={btnStyles}
              variant="contained"
              onClick={async () => {
                await UserService.blockUser(store.user.id, store.otherUser.id);
                await store.checkAuth();
              }}
            >
              Block User
            </Button>
          )}
          <ul className="mobile__profile__info">
            {store.otherUser.city !== "" ? (
              <li className="mobile__profile__info__list">
                City: {store.otherUser.city}
              </li>
            ) : null}
            {store.otherUser.birthday ? (
              <li className="mobile__profile__info__list">
                My Birthday:{" "}
                {store.otherUser.birthday.split("-").reverse().join(".")}
              </li>
            ) : null}
            {store.otherUser.stack !== "" ? (
              <li className="mobile__profile__info__list">
                Stack: {store.otherUser.stack}
              </li>
            ) : null}
            {store.otherUser.position !== "" ? (
              <li className="mobile__profile__info__list">
                Position: {store.otherUser.position}
              </li>
            ) : null}
            {store.otherUser.department !== "" ? (
              <li className="mobile__profile__info__list">
                Department: {store.otherUser.department}
              </li>
            ) : null}
            {store.otherUser.education !== "" ? (
              <li className="mobile__profile__info__list">
                Education: {store.otherUser.education}
              </li>
            ) : null}
            {store.otherUser.skype !== "" ? (
              <li className="mobile__profile__info__list">
                Skype: {store.otherUser.skype}
              </li>
            ) : null}
            {store.otherUser.phone ? (
              <li className="mobile__profile__info__list">
                Phone: +{store.otherUser.phone}
              </li>
            ) : null}
          </ul>
          <p className="mobile__profile__about">
            {store.otherUser.description !== ""
              ? `About me: ${store.otherUser.description}`
              : "Nothing at now..."}
          </p>
          {store.otherUser.friends ? (
            <UserFriends friends={store.otherUser.friends} />
          ) : null}
          <UserPosts />
        </div>
      </div>
    </>
  );
};

export default observer(OtherUserProfilePage);
