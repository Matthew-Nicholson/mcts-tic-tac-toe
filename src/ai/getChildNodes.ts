import { getLegalMoves } from "../game/utils/getLegalMoves";
import { simulateMove } from "../game/utils/simulateMove";
import { BoardState } from "../shared/types/boardState";
import { getToMoveFromBoard } from "../shared/utils/getToMoveFromBoard";
import { Node } from "./node";

export function getChildNodes(
  node: Node<BoardState>
): Node<BoardState>[] | null {
  const board: BoardState = node?.value;
  if (!board) return null;
  const childNodes: Node<BoardState>[] = [];

  const legalMoves = getLegalMoves(board);
  const sideToMove = getToMoveFromBoard(board);

  for (let move of legalMoves) {
    childNodes.push(new Node(simulateMove(board, move, sideToMove)));
  }

  return childNodes;
}
