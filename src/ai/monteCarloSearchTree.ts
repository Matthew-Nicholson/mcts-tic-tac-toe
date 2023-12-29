import { TicTacToeGame } from "../game/ticTacToeGame";
import { PlayerTypes } from "../shared/types/playerTypes";
import { calculateUCB1 } from "./calculateUCB1";
import { getReward } from "./getReward";
import { Node } from "./node";

export class MonteCarloSearchTree<T> {
  initialNode: Node<T>;
  getOptions: (node: Node<T>) => Node<T>[];
  isTerminal: (node: Node<T>) => boolean;
  getValue: (node: Node<T>) => number;
  current: Node<T>;
  constructor(
    initialNode: Node<T>,
    getOptionsCb: (node: Node<T>) => Node<T>[],
    isTerminalCb: (node: Node<T>) => boolean,
    evaluateTerminalCb: (node: Node<T>) => number
  ) {
    this.initialNode = initialNode;
    this.getOptions = getOptionsCb;
    this.isTerminal = isTerminalCb;
    this.getValue = evaluateTerminalCb;
    this.current = initialNode;
  }

  isLeafNode(node: Node<T>): boolean {
    return node.children.length === 0;
  }

  getUCB1(node: Node<T>): number {
    return calculateUCB1(node.wins, node.visits, node.parent?.visits ?? 0);
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
      console.log("Result:", this.getValue(node));
      const reward = this.getValue(node);
      this.backpropagate(node, reward);
      return;
    }

    const options = this.getOptions(node);
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
    let current = this.current;

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
    this.current = current;
    this.search(iterations - 1);
  }
}

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);
const mcts = new MonteCarloSearchTree(
  new Node(game.getBoardState()),
  null,
  game.isGameOver,
  getReward
);
