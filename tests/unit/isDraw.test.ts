import { describe, it, expect } from "vitest";
import { isDraw } from "../../src/game/utils/isDraw";
import { BoardState } from "../../src/shared/types/boardState";
import { Pieces } from "../../src/shared/types/pieces";

describe("isDraw", () => {
  it("should return true if the board is full and there is no winner", () => {
    const board: BoardState = [
      [Pieces.x, Pieces.o, Pieces.x],
      [Pieces.o, Pieces.x, Pieces.o],
      [Pieces.o, Pieces.x, Pieces.o],
    ];

    expect(isDraw(board)).toBe(true);
  });

  it("should return false if the board is not full", () => {
    const board: BoardState = [
      [Pieces.x, "", Pieces.x],
      [Pieces.o, Pieces.x, Pieces.o],
      [Pieces.o, Pieces.x, Pieces.o],
    ];

    expect(isDraw(board)).toBe(false);
  });

  it("should return false if there is a winner", () => {
    const board: BoardState = [
      [Pieces.x, Pieces.o, Pieces.x],
      [Pieces.o, Pieces.x, Pieces.o],
      [Pieces.o, Pieces.x, Pieces.x],
    ];

    expect(isDraw(board)).toBe(false);
  });
});
