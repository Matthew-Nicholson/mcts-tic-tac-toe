import { describe, it, expect } from "vitest";
import { isWin } from "../../src/game/utils/isWin";
import { getInitialPosition } from "../../src/shared/utils/getInitialPosition";
import { Pieces } from "../../src/shared/types/pieces";
import { BoardState } from "../../src/shared/types/boardState";

describe("isWin", () => {
  it("should return true when the game is won", () => {
    const gameState: BoardState = [
      [Pieces.x, Pieces.x, Pieces.x],
      [Pieces.o, Pieces.o, ""],
      ["", "", ""],
    ];
    expect(isWin(gameState, Pieces.x)).toBe(true);
  });

  it("should return false when the game is not won", () => {
    const gameState = getInitialPosition();
    expect(isWin(gameState, Pieces.x)).toBe(false);
  });
});
