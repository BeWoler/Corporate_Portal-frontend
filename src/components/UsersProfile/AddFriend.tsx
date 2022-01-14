import { useContext } from "react";
import { Context } from "../../index";
import { useNavigate } from "react-router-dom";
import FriendsService from "../../services/FriendsService";
import { Button } from "@mui/material";
import "./userProfile.css";

interface BtnProps {
  disabled?: boolean;
}

const AddFriend = ({ disabled }: BtnProps) => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const addFriend = async () => {
    await FriendsService.request(store.otherUser.id, store.user.id);
    navigate(`/friends/${store.user.id}`);
  };

  const btnStyles = {
    margin: "0 0 1.5rem 0",
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <Button
      disabled={disabled}
      variant="contained"
      sx={btnStyles}
      onClick={addFriend}
    >
      Add Friend
    </Button>
  );
};

export default AddFriend;
