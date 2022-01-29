import { Button } from "@mui/material";

interface FetchMoreProps {
  fetchMore: () => void;
}

const FetchMore = ({ fetchMore }: FetchMoreProps) => {
  const moreBtnStyles = {
    width: "fit-content",
    backgroundColor: "#534ED9",
    margin: "1rem 0",
    ":hover": { backgroundColor: "#7673D9" },
  };
  return (
    <Button sx={moreBtnStyles} variant="contained" onClick={fetchMore}>
      Show More
    </Button>
  );
};

export default FetchMore;
