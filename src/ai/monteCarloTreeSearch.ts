import { TicTacToeGame } from "../game/ticTacToeGame";
import { PlayerTypes } from "../shared/types/playerTypes";
import { calculateUCB1 } from "./calculateUCB1";
import { calculateReward } from "./calculateReward";
import { Node } from "./node";
import { Pieces } from "../shared/types/pieces";
import { getChildNodes } from "./getChildNodes";

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

  selectRandomChild(node: Node<T>): Node<T> {
    const randomIndex = Math.floor(Math.random() * node.children.length);
    return node.children[randomIndex];
  }

  rollout(node: Node<T>): void {
    if (this.isTerminal(node)) {
      const reward = this.getReward(node, this.evaluationPerspective);
      this.backpropagate(node, reward);
      return;
    }

    const options = this.getChildNodes(node);
    for (let option of options) {
      node.addChild(option);
    }
    const randomChild = this.selectRandomChild(node);
    return this.rollout(randomChild);
  }

  backpropagate(node: Node<T>, reward: number): void {
    let current;
    current = node;
    while (current) {
      current.visits++;
      current.score += reward;
      current = this.getParent(current);
    }
  }

  search(iterations: number): Node<T> | undefined {
    if (iterations < 1) {
      return this.initialNode.children.sort((a, b) => b.visits - a.visits)[0];
    }
    let current = this.currentNodeUnderEvaluation;

    // Get to a leaf node
    while (!this.isLeafNode(current)) {
      current = this.getMaxUCB1(current.children);
    }
    // Check if leaf node has been visited
    let hasVisits = this.getVisits(current) > 0;

    if (hasVisits) {
      current = this.getMaxUCB1(current.children);
    } else {
      this.rollout(current);
    }
    this.currentNodeUnderEvaluation = current;
    this.search(iterations - 1);
  }
}

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);
const mcts = new MonteCarloTreeSearch(
  Pieces.x,
  new Node(game.getBoardState()),
  getChildNodes,
  game.isGameOver.bind(game),
  calculateReward
);

mcts.search(100);

// Variables...
// CurrentNodeUnderEvaluation
