import { FC, useContext } from 'react';
import { Context } from "../../index";
import { Link } from "react-router-dom";
import FriendsService from '../../services/FriendsService';
import { Button } from "@mui/material";
import "./userProfile.css";

const AddFriend: FC = () => {
  const { store } = useContext(Context);

  const addFriend = async() => {
    await FriendsService.request(store.otherUser.id, store.user.id);
  }

  const btnStyles = {
    margin: "0 0 1.5rem 0",
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <Link to="/chat" className="linkBtn">
      <Button variant="contained" sx={btnStyles} onClick={addFriend}>Add Friend</Button>
    </Link>
  )
}

export default AddFriend;
