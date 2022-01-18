import { useState } from "react";
import { Button, Input } from "@mui/material";
import DeleteUser from "./DeleteUser";
import AdminService from "../Services/AdminService";
import { User } from "../../models/user";
import "./editUser.sass";

interface EditUserProps {
  currentUser: User;
  getUsers: () => Promise<void>;
}

const EditUser = ({ currentUser, getUsers }: EditUserProps) => {
  const [status, setStatus] = useState<string>(null);
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [birthday, setBirthday] = useState<string>();
  const [city, setCity] = useState<string>();
  const [stack, setStack] = useState<string>();
  const [position, setPosition] = useState<string>();
  const [department, setDepartment] = useState<string>();
  const [education, setEducation] = useState<string>();
  const [skype, setSkype] = useState<string>();
  const [phone, setPhone] = useState<number>();
  const [description, setDescription] = useState<string>();
  const [role, setRole] = useState<string>("member");

  const inputStyles = {
    margin: "0 0 1rem 0",
    ":after": { borderBottom: "2px solid #534ED9" },
  };
  const btnStyles = {
    margin: "0rem auto 0rem auto",
    width: "fit-content",
    backgroundColor: "#534ED9",
    ":hover": { backgroundColor: "#7673D9" },
  };

  const editUserData = async () => {
    const res = await AdminService.edit(currentUser._id, {
      firstName,
      lastName,
      city,
      birthday,
      stack,
      position,
      department,
      education,
      skype,
      phone,
      role,
      description,
    });
    if (res.status === 200) {
      setStatus("Success");
      setTimeout(() => setStatus(null), 2000);
    }
    await getUsers();
  };

  return (
    <form className="editUser__form">
      <h3 className="editUser__form__title">Edit User Data</h3>
      <h3 className="admin__success">{status ? status : null}</h3>
      <div className="editUser__data">
        <div className="editUser__mainData">
          <h4 className="editUser__title">Edit personal info</h4>
          <Input
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setBirthday(e.target.value)}
            placeholder="Age"
            type="date"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setPhone(+e.target.value)}
            placeholder="Phone"
            type="number"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setRole(e.target.value)}
            placeholder="Role"
            type="text"
            sx={inputStyles}
          />
        </div>
        <div className="editUser__otherData">
          <h4 className="editUser__title">Edit other info</h4>
          <Input
            onChange={(e) => setStack(e.target.value)}
            multiline={true}
            placeholder="Stack"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setPosition(e.target.value)}
            placeholder="Position"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setDepartment(e.target.value)}
            placeholder="Department"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setEducation(e.target.value)}
            multiline={true}
            placeholder="Education"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setSkype(e.target.value)}
            placeholder="Skype"
            type="text"
            sx={inputStyles}
          />
          <Input
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            type="text"
            multiline={true}
            sx={inputStyles}
          />
        </div>
      </div>
      <div className="editUser__btns">
        <Button onClick={editUserData} variant="contained" sx={btnStyles}>
          Save Changes
        </Button>
        <DeleteUser currentUser={currentUser} getUsers={getUsers} />
      </div>
    </form>
  );
};

export default EditUser;
