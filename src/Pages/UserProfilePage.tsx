import { FC, useContext, useEffect, useState } from "react";
import { Context } from "../index";
import { observer } from "mobx-react-lite";
import UserProfile from "../components/usersProfile/UserProfile";
import OtherUserProfile from "../components/usersProfile/OtherUserProfile";

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const [user, setUser] = useState();
  let currentId = window.location.href.split("/").reverse()[0];
  const userId = store.user.id;

  useEffect(() => {
    store.getOtherUser(currentId);
    return () => setUser(null);
  }, [user]);

  if (userId === currentId) {
    return (
      <>
        <UserProfile />
      </>
    );
  }
  return (
    <>
      <OtherUserProfile />
    </>
  );
};

export default observer(UserProfilePage);
