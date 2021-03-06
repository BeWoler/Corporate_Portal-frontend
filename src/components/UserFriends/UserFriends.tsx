import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import { User } from "../../models/user";
import "./userFriends.sass";

interface UserFriendsProps {
  friends?: User[];
}

const UserFriends = ({ friends }: UserFriendsProps) => {
  const avatarStyles = {
    width: "50px",
    height: "50px",
    bgcolor: "#534ED9",
    overflow: "hidden",
  };
  return (
    <div className="userFriends__container">
      <h3 className="userFriends__title">
        Friends <span>{friends.length}</span>
      </h3>
      <hr />
      <div className="userFriends__list">
        {friends.map((friend) => (
          <Link
            className="userFriends__link"
            key={friend._id}
            to={`/profile/${friend._id}`}
          >
            <Avatar src={friend.avatar} sx={avatarStyles}></Avatar>
            {friend.firstName}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default UserFriends;
