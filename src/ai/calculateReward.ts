import { isDraw } from "../game/utils/isDraw";
import { isGameOver } from "./isGameOver";
import { isWin } from "../game/utils/isWin";
import { BoardState } from "../shared/types/boardState";
import { Pieces } from "../shared/types/pieces";
import { GameOverReward } from "./config";
import { Node } from "./node";

export function calculateReward(
  perspective: Pieces,
  node: Node<BoardState>
): number {
  if (!isGameOver(node)) {
    throw new Error("calculateReward called on non-terminal node");
  }

  if (isDraw(node.value)) {
    return GameOverReward.draw;
  } else if (isWin(node.value, perspective)) {
    return GameOverReward.win;
  } else {
    return GameOverReward.loss;
  }
}
