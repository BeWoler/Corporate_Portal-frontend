import { useState } from "react";
import { User } from "../../models/user";
import { Autocomplete, TextField, Button } from "@mui/material";
import "./userFilter.css";

interface UsersProps {
  users?: User[];
  getUsersWithQuery?: any;
  getUsersWithoutQuery?: any;
}

const UserFilter = ({
  users,
  getUsersWithQuery,
  getUsersWithoutQuery,
}: UsersProps) => {
  const [email, setEmail] = useState<string>();
  const [username, setUsername] = useState<string>();
  const [city, setCity] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [stack, setStack] = useState<string>();
  const params = { email, username, city, department, position, stack };
  const autocompleteStyles = {
    margin: "0 0 1rem 0",
    width: "200px",
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#534ED9",
      },
    },
    "& label.Mui-focused": {
      color: "#534ED9",
    },
  };

  const btnStyles = {
    margin: "1rem 0 0 0",
    width: "100%",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  return (
    <form className="filter__form">
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={users.map((user) => user.email)}
        sx={autocompleteStyles}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="controllable-states-demo"
        options={users.map((user) => user.username)}
        sx={autocompleteStyles}
        renderInput={(params) => (
          <TextField
            {...params}
            value={username}
            label="Username"
            onChange={(e) => setUsername(e.target.value)}
            onClick={(e) => console.log(username)}
          />
        )}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["Minsk", "Gomel", "Grodno", "Mogilev"]}
        sx={autocompleteStyles}
        renderInput={(params) => (
          <TextField
            {...params}
            label="City"
            onChange={(e) => setCity(e.target.value)}
          />
        )}
      />
      <TextField
        label="Department"
        sx={autocompleteStyles}
        onChange={(e) => setDepartment(e.target.value)}
      />
      <TextField
        label="Position"
        sx={autocompleteStyles}
        onChange={(e) => setPosition(e.target.value)}
      />
      <TextField
        label="Stack"
        sx={autocompleteStyles}
        onChange={(e) => setStack(e.target.value)}
      />
      <Button variant="contained" sx={btnStyles} onClick={getUsersWithoutQuery}>
        Clear
      </Button>
      <Button
        variant="contained"
        sx={btnStyles}
        onClick={() => getUsersWithQuery(params)}
      >
        Confirm
      </Button>
    </form>
  );
};

export default UserFilter;
