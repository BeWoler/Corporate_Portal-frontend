import { FC, useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import UserProfile from "../../components/UsersProfile/UserProfile";
import OtherUserProfile from "../../components/UsersProfile/OtherUserProfile";

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);
  let currentId = window.location.href.split("/").reverse()[0];
  const userId = store.user.id;

  useEffect(() => {
    store.getOtherUser(currentId);
    return () => null;
  }, [currentId, store]);

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
