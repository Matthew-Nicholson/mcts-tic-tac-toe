import { BoardState } from "../types/boardState";
import { Pieces } from "../types/pieces";

export function getToMoveFromBoard(board: BoardState): Pieces {
  return board.flat().filter((s) => s !== "").length % 2 === 0
    ? Pieces.x
    : Pieces.o;
}
