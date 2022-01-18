import { FC, useState, useContext } from "react";
import { Context } from "../../index";
import api from "../../http/axios";
import ChangeAvatarPreview from "./ChangeAvatarPreview";
import ChangeAvatarForm from "./ChangeAvatarForm";
import "./changeAvatar.sass";

const ChangeAvatar: FC = () => {
  const { store } = useContext(Context);
  const [img, setImg] = useState<any>();
  const [file, setFile] = useState<any>();

  const imageChange = (event: any) => {
    let reader = new FileReader();
    const file = event.target.files[0];
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

  let imgPreview = img;

  if (img) {
    imgPreview = <img src={img} alt="img" className="avatar__preview" />;
  } else {
    imgPreview = null;
  }

  return (
    <div className="upload__container">
      <h2 className="upload__title">Change Avatar</h2>
      <ChangeAvatarForm imageChange={imageChange} imageUpload={imageUpload} />
      <ChangeAvatarPreview img={img} />
      <div className="upload__view">{imgPreview}</div>
    </div>
  );
};

export default ChangeAvatar;
