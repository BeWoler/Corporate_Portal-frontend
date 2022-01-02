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
  const [city, setCity] = useState<string>("");
  const [oldCity, setOldCity] = useState<string>("");
  const [department, setDepartment] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [stack, setStack] = useState<string>();
  const params = { city, department, position, stack };
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

  let citys: string[] = [];
  users?.map((user) => citys.push(user.city));
  const usersCities = Array.from(new Set(citys));

  return (
    <form className="filter__form">
      <Autocomplete
        value={oldCity}
        inputValue={city}
        onInputChange={(event, newInputValue) => {
          setCity(newInputValue);
        }}
        onChange={(event, newCity) => {
          setOldCity(newCity);
        }}
        id="controllable-states-demo"
        options={usersCities.map((city) => city)}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="City" />}
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
      <Button
        variant="contained"
        sx={btnStyles}
        onClick={() => {
          setCity("");
          setOldCity("");
          setDepartment(null);
          setPosition(null);
          setStack(null);
          getUsersWithoutQuery();
        }}
      >
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
