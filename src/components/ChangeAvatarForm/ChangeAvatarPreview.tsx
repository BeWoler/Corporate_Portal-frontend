import { Avatar } from "@mui/material";
import "./changeAvatar.css";

interface ChangeAvatarPreviewProps {
  img: any;
}

const ChangeAvatarPreview = ({ img }: ChangeAvatarPreviewProps) => {
  return (
    <div className="upload__avatar__preview">
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
  );
};

export default ChangeAvatarPreview;
