import React from "react";
import { TextField } from "@mui/material";

interface InputProps {
  label: string;
}

const customInput = {
  margin: '2rem 2rem 0rem 2rem'
}

const MyInput = ({label}: InputProps) => {
  return <TextField id="outlined-basic" label={label} variant="outlined" sx={customInput} />;
}

export default MyInput;
