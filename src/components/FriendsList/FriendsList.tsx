import { FC, useEffect, useState, useContext } from "react";
import { Context } from "../../index";
import { User } from "../../models/user";
import { Link } from "react-router-dom";
import { Avatar } from "@mui/material";
import "./friendsList.css";

const FriendsList: FC = () => {
  const { store } = useContext(Context);
  const [friends, setFriends] = useState<User[]>([]);

  useEffect(() => {
    setFriends(store.user.friends);
    return () => setFriends(null);
  }, [store.user.friends]);

  const avatarStyles = {
    width: "100px",
    height: "100px",
    margin: "0 .8rem 0 0",
    backgroundColor: "#534ED9",
    fontSize: "50px",
  };

  return (
    <ul className="friends__list">
      {friends.length > 0 ? (
        friends.map((friend: any) => {
          return (
            <li className="users__li" key={friend._id}>
              <Link to={`/profile/${friend._id}`}>
                <Avatar src={friend.avatar} sx={avatarStyles}></Avatar>
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
        })
      ) : (
        <h3 className="empty__page">No friends yet</h3>
      )}
    </ul>
  );
};

export default FriendsList;
