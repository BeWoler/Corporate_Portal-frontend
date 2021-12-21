import { FC } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./userProfile.css";

const AddFriend: FC = () => {
  const btnStyles = {
    margin: "0 0 1.5rem 0",
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <Link to="/chat" className="linkBtn">
      <Button variant="contained" sx={btnStyles}>Add Friend</Button>
    </Link>
  )
}

export default AddFriend;
