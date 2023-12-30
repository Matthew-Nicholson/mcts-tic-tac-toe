import { BoardState } from "../../shared/types/boardState";
import type { Square } from "../types";

export function getLegalMoves(boardState: BoardState): Square[] {
  const legalMoves: Square[] = [];

  boardState.forEach((row, i) => {
    row.forEach((col, j) => {
      if (col === "") {
        legalMoves.push([i, j] as Square);
      }
    });
  });
  return legalMoves;
}
