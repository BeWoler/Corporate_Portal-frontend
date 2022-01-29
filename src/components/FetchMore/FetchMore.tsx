import { Button } from "@mui/material";
import "./fetchMore.sass";

interface FetchMoreProps {
  fetchMore: () => void;
}

const FetchMore = ({ fetchMore }: FetchMoreProps) => {
  const moreBtnStyles = {
    width: "fit-content",
    backgroundColor: "#534ED9",
    margin: "0 1rem",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <Button
      sx={moreBtnStyles}
      id="fetchMoreBtn"
      variant="contained"
      onClick={fetchMore}
    >
      Show More
    </Button>
  );
};

export default FetchMore;
