import React from "react";
import { Button } from "@mui/material";

interface BtnProps {
  value: string;
  variant: object;
}

const customBtn = {
  margin: "2rem",
};

const MyButton = ({ value, variant }: BtnProps) => {
  return (
    <Button {...variant} sx={customBtn}>
      {value}
    </Button>
  );
};

export default MyButton;
