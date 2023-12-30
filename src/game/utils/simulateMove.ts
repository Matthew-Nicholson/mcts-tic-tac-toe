import { BoardState } from "../../shared/types/boardState";
import { Pieces } from "../../shared/types/pieces";
import { copyBoard } from "../../shared/utils/copyBoard";
import { Square } from "../types";

export function simulateMove(
  board: BoardState,
  move: Square,
  piece: Pieces
): BoardState {
  const newBoard = copyBoard(board);
  const [row, col] = move;
  newBoard[row][col] = piece;
  return newBoard;
}
