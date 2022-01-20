import { User } from "../../models/user";
import { Avatar, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import "./allUsers.sass";

interface AllUsersProps {
  filteredUsers: User[];
}

const AllUsers = ({ filteredUsers }: AllUsersProps) => {
  const avatarStyles = {
    width: "100px",
    height: "100px",
    margin: "0 .8rem 0 0",
    backgroundColor: "#534ED9",
    fontSize: "50px",
  };

  return (
    <ul className="users__ul">
      {filteredUsers
        ? filteredUsers.map((user) => (
            <li className="users__li" key={user._id}>
              <Link to={`/profile/${user._id}`}>
                <Avatar src={user.avatar} sx={avatarStyles}></Avatar>
              </Link>
              <ul className="users__data__ul">
                <li className="users__data__li">
                  {user.firstName && user.lastName
                    ? `${user.firstName} ${user.lastName}`
                    : null}
                </li>
                <li className="users__data__li">
                  {user.email ? `Email: ${user.email}` : null}
                </li>
                <li className="users__data__li">
                  {user.city ? `City: ${user.city}` : null}
                </li>
                <li className="users__data__li">
                  {user.birthday
                    ? `Birthday: ${user.birthday
                        .split("-")
                        .reverse()
                        .join(".")}`
                    : null}
                </li>
              </ul>
            </li>
          ))
        : null}
    </ul>
  );
};

export default AllUsers;
