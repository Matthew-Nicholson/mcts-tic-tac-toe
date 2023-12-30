import { BoardState } from "../shared/types/boardState";
import { Pieces } from "../shared/types/pieces";
import { GameOverReward } from "./config";
import { Node } from "./node";

export function calculateReward(
  node: Node<BoardState>,
  perspective: Pieces
): number {
  // TODO @Matthew-Nicholson
  return 1;
}
