import { FC } from 'react';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./userProfile.css";

const SendMessage: FC = () => {
  const btnStyles = {
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <Link to="/chat" className="linkBtn">
      <Button variant="contained" sx={btnStyles}>Send Message</Button>
    </Link>
  )
}

export default SendMessage;
