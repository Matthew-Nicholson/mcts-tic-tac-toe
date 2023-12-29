import { BoardState } from "../../shared/types/boardState";
import { Pieces } from "../../shared/types/pieces";
import { isWin } from "./isWin";

export function isDraw(board: BoardState): boolean {
  return (
    !isWin(board, Pieces.x) &&
    !isWin(board, Pieces.o) &&
    board.flat().every((square) => square !== "")
  );
}
