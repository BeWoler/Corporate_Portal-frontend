import { useContext } from "react";
import { Context } from "../../index";
import { observer } from "mobx-react-lite";
import { User } from "../../models/user";
import { Autocomplete, TextField, Button } from "@mui/material";
import "./userFilter.css";

interface UsersProps {
  users?: User[];
}

const UserFilter = ({ users }: UsersProps) => {
  const { store } = useContext(Context);
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
        renderInput={(params) => <TextField {...params} label="Email" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={users.map((user) => user.username)}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="Username" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["gg", "hh", "tt"]}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="City" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["gg", "hh", "tt"]}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="Department" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["gg", "hh", "tt"]}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="Position" />}
      />
      <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={["gg", "hh", "tt"]}
        sx={autocompleteStyles}
        renderInput={(params) => <TextField {...params} label="Stack" />}
      />
      <Button variant="contained" sx={btnStyles}>
        Confirm
      </Button>
    </form>
  );
};

export default observer(UserFilter);
