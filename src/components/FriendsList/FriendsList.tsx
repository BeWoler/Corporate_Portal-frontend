import { FC, useEffect, useState } from "react";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import FriendsService from "../../services/FriendsService";
import "./friendsList.css";

const FriendsList: FC = () => {
  const [friends, setFriends] = useState<User[]>([]);
  const receiverId = window.location.href.split("/").reverse()[0];

  const getUserFriends = async () => {
    const response = await FriendsService.getUserFriends(receiverId);
    setFriends(response.data);
  };

  useEffect(() => {
    getUserFriends();
    return () => setFriends(null);
  }, []);

  const avatarStyles = {
    width: "100px",
    height: "100px",
    margin: "0 .8rem 0 0",
    backgroundColor: "#534ED9",
    fontSize: "50px",
  };

  return (
    <ul className="friends__list">
      {friends.map((friend) => {
        return (
          <li className="users__li" key={friend._id}>
            <Link to={`/profile/${friend._id}`}>
              <Avatar
                src={friend.avatar}
                sx={avatarStyles}
              ></Avatar>
            </Link>
            <ul className="users__data__ul">
              <li className="users__data__li">
                {friend.firstName && friend.lastName
                  ? `${friend.firstName} ${friend.lastName}`
                  : null}
              </li>
              <li className="users__data__li">
                {friend.email ? `Email: ${friend.email}` : null}
              </li>
              <li className="users__data__li">
                {friend.city ? `City: ${friend.city}` : null}
              </li>
              <li className="users__data__li">
                {friend.birthday
                  ? `Birthday: ${friend.birthday
                      .split("-")
                      .reverse()
                      .join(".")}`
                  : null}
              </li>
            </ul>
          </li>
        );
      })}
    </ul>
  );
};

export default FriendsList;
