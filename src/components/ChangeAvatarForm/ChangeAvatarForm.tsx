import { ChangeEvent, MouseEvent } from "react";
import { Button, Input } from "@mui/material";
import "./changeAvatar.css";

interface ChangeAvatarFormProps {
  imageChange: (event: ChangeEvent) => void;
  imageUpload: (event: MouseEvent) => Promise<void>;
}

const ChangeAvatarForm = ({
  imageChange,
  imageUpload,
}: ChangeAvatarFormProps) => {
  return (
    <form className="upload__form">
      <Input
        sx={{
          ":after": { borderBottom: "2px solid #534ED9" },
        }}
        type="file"
        onChange={(event) => {
          imageChange(event);
        }}
      />
      <Button
        variant="contained"
        sx={{
          backgroundColor: "#534ED9",
          ":hover": {
            backgroundColor: "#7673D9",
          },
        }}
        onClick={(event) => imageUpload(event)}
      >
        Upload
      </Button>
    </form>
  );
};

export default ChangeAvatarForm;
