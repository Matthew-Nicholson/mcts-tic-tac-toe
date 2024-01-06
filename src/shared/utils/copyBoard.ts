import { BoardState } from "../types/boardState";

export function copyBoard(board: BoardState): BoardState {
  return board.map((row) => row.slice()) as BoardState;
}
