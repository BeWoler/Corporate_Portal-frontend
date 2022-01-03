import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../../index";
import { Avatar, Button } from "@mui/material";
import { observer } from "mobx-react-lite";
import UserService from "../../services/UserService";
import "./userProfile.css";

const PrivateProfile: FC = () => {
  const { store } = useContext(Context);
  const [blocked, setBlocked] = useState<boolean>(false);

  useEffect(() => {
    if (store.user.blockedUser?.includes(store.otherUser.id)) {
      setBlocked(true);
      return () => setBlocked(false);
    }
    return () => setBlocked(false);
  }, [store.otherUser.id, store.user.blockedUser]);

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

  return (
    <div className="profile__container">
      <div className="profile__first__column">
        <Avatar variant="square" src={store.otherUser.avatar} sx={avatarStyles}>
          {store.otherUser.firstName}
        </Avatar>
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
                await UserService.blockUser(store.user.id, store.otherUser.id);
                await store.checkAuth();
              }}
            >
              Block User
            </Button>
          )}
        </p>
        <div className="profile__private">
          This profile is hidden from others
        </div>
      </div>
    </div>
  );
};

export default observer(PrivateProfile);
