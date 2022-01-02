import { useContext } from "react";
import { Context } from "../../index";
import { Button } from "@mui/material";
import FriendsService from "../../services/FriendsService";

interface BtnProps {
  friendId: string;
}

const DeleteFriendBtn = ({ friendId }: BtnProps) => {
  const { store } = useContext(Context);

  const btnStyles = {
    margin: "0 0 0 2rem",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const deleteFriend = async () => {
    await FriendsService.delete(store.user.id, friendId);
    store.checkAuth();
  };

  return (
    <Button sx={btnStyles} variant="contained" onClick={deleteFriend}>
      Delete
    </Button>
  );
};

export default DeleteFriendBtn;
