import { FC, useState, useContext } from "react";
import { Avatar, Button, Input } from "@mui/material";
import { Context } from "../index";
import "../styles/changeAvatar.css";
import api from "../http/axios";

const ChangeAvatar: FC = () => {
  const { store } = useContext(Context);
  const [img, setImg] = useState<any>();
  const [file, setFile] = useState<any>();

  const imageUpload = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    await api.post("/avatar", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    store.checkAuth();
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

  let imgPreview = img;

  if (img) {
    imgPreview = <img src={img} alt="img" className="avatar__preview" />;
  } else {
    imgPreview = null;
  }

  return (
    <div className="upload__container">
      <h2 className="upload__title">Change Avatar</h2>
      <form className="upload__form">
        <Input
          sx={{
            ":after": { borderBottom: "2px solid #bf4444" },
          }}
          type="file"
          onChange={(e) => {
            imageChange(e);
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#bf4444",
            ":hover": {
              backgroundColor: "#bc6464",
            },
          }}
          onClick={(e) => imageUpload(e)}
        >
          Upload
        </Button>
      </form>
      <div className="upload__avatar__preview">
        <Avatar
          src={img}
          sx={{
            width: "200px",
            borderRadius: "0",
            height: "200px",
            margin: "0 1rem 0 0",
            backgroundColor: "#bf4444",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "200px",
            height: "200px",
            margin: "0 1rem 0 0",
            backgroundColor: "#bf4444",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "100px",
            height: "100px",
            margin: "0 1rem 0 0",
            backgroundColor: "#bf4444",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "50px",
            height: "50px",
            margin: "0 1rem 0 0",
            backgroundColor: "#bf4444",
            fontSize: "50px",
          }}
        />
        <Avatar
          src={img}
          sx={{
            width: "30px",
            height: "30px",
            margin: "0 1rem 0 0",
            backgroundColor: "#bf4444",
            fontSize: "50px",
          }}
        />
      </div>
      <div className="upload__view">{imgPreview}</div>
    </div>
  );
};

export default ChangeAvatar;
