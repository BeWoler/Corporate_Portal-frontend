import { FC } from "react";
import FriendsList from "../../components/FriendsList/FriendsList";
import FriendsRequest from "../../components/FriendsRequest/FriendsRequest";
import "./friends.css";

const Friends: FC = () => {
  return (
    <div className="friends__container">
      <h2 className="friends__title">Friends</h2>
      <div className="friends__box">
        <FriendsList />
        <FriendsRequest />
      </div>
    </div>
  );
};

export default Friends;
