import { BoardState } from "../../shared/types/boardState";

export function isGameOver(board: BoardState): boolean {
  return board.flat().every((square) => square !== "");
}
