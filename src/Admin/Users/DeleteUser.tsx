import { Button } from "@mui/material";
import { User } from "../../models/user";
import AdminService from "../Services/AdminService";
import "./users.css";

interface DeleteUserProps {
  currentUser: User;
  getUsers: () => Promise<void>;
}

const DeleteUser = ({ currentUser, getUsers }: DeleteUserProps) => {
  const btnStyles = {
    margin: "0rem 1rem",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const deleteUser = async () => {
    await AdminService.delete(currentUser._id);
    await getUsers();
  };

  return (
    <Button variant="contained" sx={btnStyles} onClick={deleteUser}>
      Delete User
    </Button>
  );
};

export default DeleteUser;
