import { Results } from "../game/types";
import { Pieces } from "../shared/types/pieces";
import { GameOverReward } from "./config";

export function getReward(player: Pieces, result: Results): number {
  if (result === "draw") {
    return GameOverReward.draw;
  } else if (result === player) {
    return GameOverReward.win;
  } else if (result !== player) {
    return GameOverReward.loss;
  } else {
    throw new Error("Invalid getReward result");
  }
}
