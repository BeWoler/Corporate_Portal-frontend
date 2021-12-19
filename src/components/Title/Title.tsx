import { FC } from 'react';
import "./title.css";
import ApiIcon from "@mui/icons-material/Api";

const Title: FC = () => {
  const apiIconStyles = {
    color: "#534ED9",
    marginRight: ".6rem",
    width: "4rem",
    height: "4rem",
  };

  return (
    <div className="title">
      <ApiIcon sx={apiIconStyles}/>
      <div>
      <h1 className="title__title">Corporate Portal</h1>
      <p className="title__text">This is your "virtual office" that allows you to share information, documents, add, change, delete, communicate with your colleagues</p>
      </div>
    </div>
  )
}

export default Title;
