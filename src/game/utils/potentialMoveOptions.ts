import { BoardState } from "../../shared/types/boardState";
import { Pieces } from "../../shared/types/pieces";
import { SquareState } from "../../shared/types/squareState";
import type { Square } from "../types";
import { isGameOver } from "./isGameOver";

export function potentialMoveOptions(
  squares: Square[],
  board: BoardState,
  piece: Pieces
): SquareState[][][] {
  if (isGameOver(board) || squares.length == 0) return [];
  let potentialBoardOptions = [];
  let copyOfBoard;
  for (let i = 0; i < squares.length; i++) {
    copyOfBoard = board.map((row) => [...row]);
    let row = squares[i][0];
    let column = squares[i][1];
    copyOfBoard[row][column] = piece;
    potentialBoardOptions.push(copyOfBoard);
  }
  return potentialBoardOptions;
}
