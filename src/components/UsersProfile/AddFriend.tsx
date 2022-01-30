import { useContext, useState } from "react";
import { Context } from "../../index";
import { Button } from "@mui/material";
import FriendsService from "../../services/FriendsService";
import "./userProfile.sass";

interface BtnProps {
  disabled?: boolean;
}

const AddFriend = ({ disabled }: BtnProps) => {
  const { store } = useContext(Context);
  const [active, setActive] = useState<boolean>(disabled);

  const addFriend = async () => {
    await FriendsService.request(store.otherUser.id, store.user.id);
    setActive(true);
  };

  const btnStyles = {
    margin: "0 0 1.5rem 0",
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <Button
      disabled={active}
      variant="contained"
      sx={btnStyles}
      onClick={addFriend}
    >
      Add Friend
    </Button>
  );
};

export default AddFriend;
