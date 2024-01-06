import { MCTS } from "../../src/ai/mcts";
import { Tree } from "../../src/ai/tree";
import { Node } from "../../src/ai/node";
import { BoardState } from "../../src/shared/types/boardState";
import { Pieces } from "../../src/shared/types/pieces";
import { Square } from "../../src/game/types";
import { getChildNodes } from "../../src/ai/getChildNodes";
import { calculateReward } from "../../src/ai/calculateReward";

import { describe, it, expect, beforeEach } from "vitest";

describe("MCTS", () => {
  it("should select the best move - 1", () => {
    const boardState: BoardState = [
      [Pieces.Empty, Pieces.Empty, Pieces.Empty],
      [Pieces.Empty, Pieces.Empty, Pieces.Empty],
      [Pieces.Empty, Pieces.Empty, Pieces.Empty],
    ];
    const calculateRewardX: (gameOverState: Node<BoardState>) => number = (
      node: Node<BoardState>
    ) => calculateReward(Pieces.X, node);
    const tree = new Tree<BoardState>();
    tree.addRoot(new Node<BoardState>(boardState));
    const mcts = new MCTS<BoardState>(tree, getChildNodes, calculateRewardX);

    // Run the MCTS algorithm to select the best move
    const bestMove = mcts.getBestMove(tree.getRoot()!, 500)!.value;
    // Assert X in the center
    expect(bestMove[1][1]).toBe(Pieces.X);
  });
});
