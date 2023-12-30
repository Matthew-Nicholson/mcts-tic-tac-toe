import { TicTacToeGame } from "../game/ticTacToeGame";
import { PlayerTypes } from "../shared/types/playerTypes";
import { calculateUCB1 } from "./calculateUCB1";
import { calculateReward } from "./calculateReward";
import { Node } from "./node";
import { Pieces } from "../shared/types/pieces";
import { getChildNodes } from "./getChildNodes";
import { isGameOver } from "./isGameOver";
import { copyBoard } from "../shared/utils/copyBoard";

export class MonteCarloTreeSearch<T, EP extends string> {
  evaluationPerspective: EP;
  initialNode: Node<T>;
  getChildNodes: (node: Node<T>) => Node<T>[];
  isTerminal: (node: Node<T>) => boolean;
  getReward: (node: Node<T>, perspective: EP) => number;
  private currentNodeUnderEvaluation: Node<T>;
  constructor(
    evaluationPerspective: EP,
    initialNode: Node<T>,
    getChildNodes: (node: Node<T>) => Node<T>[],
    isTerminal: (node: Node<T>) => boolean,
    getReward: (node: Node<T>, perspective: EP) => number
  ) {
    this.evaluationPerspective = evaluationPerspective;
    this.initialNode = initialNode;
    this.getChildNodes = getChildNodes;
    this.isTerminal = isTerminal;
    this.getReward = getReward;
    this.currentNodeUnderEvaluation = initialNode;
  }

  isLeafNode(node: Node<T>): boolean {
    return node.children.length === 0;
  }

  getUCB1(node: Node<T>): number {
    return calculateUCB1(node.score, node.visits, node.parent?.visits ?? 0);
  }

  getMaxUCB1(nodes: Node<T>[]): Node<T> {
    let maxUCB1 = -Infinity;
    let bestChild: Node<T> = nodes[0];

    for (let node of nodes) {
      const currUCB1 = this.getUCB1(node);
      if (currUCB1 > maxUCB1) {
        maxUCB1 = currUCB1;
        bestChild = node;
      }
    }
    return bestChild;
  }

  getParent(node: Node<T>): Node<T> | null {
    return node.parent;
  }

  getVisits(node: Node<T>): number {
    return node.visits;
  }

  expandNode(node: Node<T>): void {
    if (node.children.length > 0) {
      return;
    }
    const childNodes = this.getChildNodes(node);
    for (let child of childNodes) {
      node.addChild(child);
    }
  }

  rollout(node: Node<T>): void {
    let current = node;
    while (!this.isTerminal(current)) {
      let opts = this.getChildNodes(current);
      current = opts[Math.floor(Math.random() * opts.length)];
    }
  }

  backpropagate(node: Node<T>, reward: number): void {
    let current = node;
    while (current) {
      current.visits++;
      current.score += reward;
      current = this.getParent(current) as Node<T>;
    }
  }

  search(iterations: number, node: Node<T>): T | null {
    console.log("searching...");
    if (iterations === 0) {
      return this.initialNode.children.sort((a, b) => b.visits - a.visits)[0]
        .value;
    }
    let current = node;
    if (this.isLeafNode(current)) {
      if (this.getVisits(current) === 0) {
        this.rollout(current);
      } else {
        for (let child of this.getChildNodes(current)) {
          current.addChild(child);
        }
        current = node.children[0];
        this.rollout(current);
      }
    } else {
      current = this.getMaxUCB1(current.children);
    }
    return this.search(iterations - 1, node);
  }
}

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);
const mcts = new MonteCarloTreeSearch(
  Pieces.x,
  new Node(game.getBoardState()),
  getChildNodes,
  isGameOver,
  calculateReward
);

mcts.search(2, mcts.initialNode);

// Variables...
// CurrentNodeUnderEvaluation
