import { useState, useContext } from "react";
import { Context } from "../../index";
import { Input, Button } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import PostService from "../../services/PostService";
import api from "../../http/axios";

interface CreatePostFormProps {
  createPost: () => Promise<void>;
}

const CreatePostForm = ({ createPost }: CreatePostFormProps) => {
  const { store } = useContext(Context);
  const [img, setImg] = useState<any>();
  const [postText, setPostText] = useState<string>("");
  const [file, setFile] = useState<any>();

  const fileUpload = async (e: any) => {
    try {
      e.preventDefault();
      if (file) {
        const formData = new FormData();
        formData.append("files", file);
        const res = await api.post("/post/upload", formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        await PostService.createPost(store.user.id, postText, res.data.path);
        setPostText("");
        setFile("");
      } else {
        await PostService.createPost(store.user.id, postText, null);
        setPostText("");
      }
    } catch (e) {
      await PostService.createPost(store.user.id, postText, null);
      setPostText("");
    }
  };

  const fileChange = (e: any) => {
    let reader = new FileReader();
    const file = e.target.files[0];
    if (file && file.size > 8000000) {
      setImg(null);
      setFile(null);
      return alert("File size should be less then 8Mb");
    } else {
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
    }
  };

  let filePreview = img;

  if (img) {
    filePreview = (
      <div>
        <a href={img} download>
          {file?.type === "image/jpeg" ||
          file?.type === "image/jpg" ||
          file?.type === "image/png" ? (
            <img src={img} className="file__preview" alt={file.name} />
          ) : (
            <div>
              <InsertDriveFileIcon
                sx={{
                  color: "#534ED9",
                  width: "30px",
                  height: "30px",
                  verticalAlign: "middle",
                  margin: "1rem 0",
                }}
              />
              {file.name}
            </div>
          )}
        </a>
      </div>
    );
  } else {
    filePreview = null;
  }

  return (
    <form className="posts__create" encType="multipart/form-data">
      <div className="posts__create__inputs">
        <Input
          name="files"
          type="file"
          sx={{
            margin: "0 0 1rem 0",
            width: "fit-content",
            ":after": { borderBottom: "2px solid #534ED9" },
          }}
          onChange={(e) => {
            fileChange(e);
          }}
        />
        {file ? filePreview : null}
        <Input
          value={postText}
          onChange={(e) => {
            setPostText(e.target.value);
          }}
          type="text"
          placeholder="Tell us something"
          multiline={true}
          sx={{
            margin: "0 0 1rem 0",
            ":after": { borderBottom: "2px solid #534ED9" },
          }}
        />
      </div>
      <div className="posts__create__btn">
        <Button
          disabled={postText === "" || file === null}
          onClick={async (e) => {
            e.preventDefault();
            await fileUpload(e);
            await createPost();
          }}
          variant="contained"
          sx={{
            backgroundColor: "#534ED9",
            ":hover": {
              backgroundColor: "#7673D9",
            },
          }}
        >
          Create Post
        </Button>
      </div>
    </form>
  );
};

export default CreatePostForm;
