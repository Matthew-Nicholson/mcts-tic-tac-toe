import { isDraw } from "../game/utils/isDraw";
import { isWin } from "../game/utils/isWin";
import { BoardState } from "../shared/types/boardState";
import { Pieces } from "../shared/types/pieces";
import { Node } from "./node";

export function isGameOver(node: Node<BoardState>): boolean {
  return (
    isDraw(node.value) ||
    isWin(node.value, Pieces.x) ||
    isWin(node.value, Pieces.o)
  );
}
