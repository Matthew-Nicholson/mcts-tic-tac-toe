import { BoardState } from "../../shared/types/boardState";
import { Pieces } from "../../shared/types/pieces";
import { isWin } from "./isWin";

export function isGameOver(board: BoardState): boolean {
  return (
    isWin(board, Pieces.X) ||
    isWin(board, Pieces.O) ||
    board.flat().every((square) => square !== "")
  );
}
