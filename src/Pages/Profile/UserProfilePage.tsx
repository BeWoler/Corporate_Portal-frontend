import { FC, useContext, useEffect } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { useLocation } from "react-router-dom";
import UserProfile from "../../components/UsersProfile/UserProfile";
import OtherUserProfile from "../../components/UsersProfile/OtherUserProfile";

const UserProfilePage: FC = () => {
  const { store } = useContext(Context);
  const location = useLocation();
  const currentId = location.pathname.split("/").reverse()[0];
  const userId = store.user.id;

  useEffect(() => {
    if (userId !== currentId) {
      store.getOtherUser(currentId);
      return () => null;
    }
    return () => null;
  }, [currentId, store, userId]);

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
