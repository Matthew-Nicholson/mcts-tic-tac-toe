import { BoardState } from "../types/boardState";

export function getInitialPosition(): BoardState {
  return [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
}
