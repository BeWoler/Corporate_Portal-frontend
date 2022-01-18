import { useState } from "react";
import { Avatar, Button, Input } from "@mui/material";
import AdminService from "../Services/AdminService";
import { User } from "../../models/user";
import "./changeUserAvatar.sass";

interface ChangeUserAvatarProps {
  currentUser: User;
  getUsers: () => Promise<void>;
}

const ChangeUserAvatar = ({ currentUser, getUsers }: ChangeUserAvatarProps) => {
  const [img, setImg] = useState<any>();
  const [file, setFile] = useState<any>();
  const [status, setStatus] = useState<string>(null);

  const imageUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    const res = await AdminService.upload(formData);
    await AdminService.changeAvatar(currentUser._id, res.data.path).then(
      (res) => {
        if (res.status === 200) {
          setStatus("Success");
          setTimeout(() => setStatus(null), 2000);
        }
      }
    );
    await getUsers();
    setImg(null);
    setFile(null);
  };

  const imageChange = (e: any) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    if (file) {
      reader.onloadend = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
      setFile(file);
    } else {
      setImg(null);
      setFile(null);
    }
  };

  return (
    <div className="changeUserAvatar__container">
      <h3 className="changeUserAvatar__title">Change User Avatar</h3>
      <h3 className="admin__success">{status ? status : null}</h3>
      <form className="changeUserAvatar__form" encType="multipart/form-data">
        <Input
          sx={{
            ":after": { borderBottom: "2px solid #534ED9" },
          }}
          type="file"
          onChange={(e) => {
            imageChange(e);
          }}
        />
        <Button
          disabled={!img}
          variant="contained"
          sx={{
            backgroundColor: "#534ED9",
            ":hover": {
              backgroundColor: "#7673D9",
            },
          }}
          onClick={(e) => imageUpload(e)}
        >
          Upload
        </Button>
      </form>
      <div className="changeUserAvatar__avatar__preview">
        <Avatar
          src={img}
          sx={{
            width: "200px",
            borderRadius: "0",
            height: "200px",
            margin: "0 1rem 0 0",
            backgroundColor: "#534ED9",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "200px",
            height: "200px",
            margin: "0 1rem 0 0",
            backgroundColor: "#534ED9",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "100px",
            height: "100px",
            margin: "0 1rem 0 0",
            backgroundColor: "#534ED9",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "50px",
            height: "50px",
            margin: "0 1rem 0 0",
            backgroundColor: "#534ED9",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "30px",
            height: "30px",
            margin: "0 1rem 0 0",
            backgroundColor: "#534ED9",
            fontSize: "50px",
          }}
        />
      </div>
    </div>
  );
};

export default ChangeUserAvatar;
