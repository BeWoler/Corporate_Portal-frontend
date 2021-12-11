import { FC } from "react";
import "../styles/board.css";
import BoardPosts from "../components/BoardPosts";

const Board: FC = () => {
  return (
    <div className="board__container">
      <h2 className="board__title">Board</h2>
      <div className="board__box">
        <BoardPosts />
      </div>
    </div>
  );
};

export default Board;
