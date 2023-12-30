import { BoardState } from "../types/boardState";
import { Pieces } from "../types/pieces";

export function getToMoveFromBoard(board: BoardState): Pieces {
  return board.flat().length % 2 === 0 ? Pieces.o : Pieces.x;
}
