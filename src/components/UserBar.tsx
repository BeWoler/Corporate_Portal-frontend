import { Button } from "@mui/material";
import { FC, useContext } from "react";
import { Context } from "../index";

const UserBar: FC = () => {
  const { store } = useContext(Context);
  return (
    <div>
      {store.user.email}
      <Button
        variant="contained"
        color="error"
        onClick={() => store.logout()}
        sx={{
          margin: "-0.2rem 0 0 1rem",
          height: "1.5rem",
        }}
      >
        Logout
      </Button>
    </div>
  );
};

export default UserBar;
