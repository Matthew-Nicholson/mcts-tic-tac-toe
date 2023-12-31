import { Tree } from "./tree";
import { Node } from "./node";

export class MCTS<T> {
  tree: Tree<T>;
  explorationConstant: number;
  getFutureStates: (node: Node<T>) => Node<T>[] | null;
  getReward: (gameOverState: Node<T>) => number;
  constructor(
    tree: Tree<T>,
    getFutureStates: (state: Node<T>) => Node<T>[] | null,
    getReward: (gameOverState: Node<T>) => number
  ) {
    this.tree = tree;
    this.explorationConstant = 2;
    this.getFutureStates = getFutureStates;
    this.getReward = getReward;
  }

  ucb1(node: Node<T>): number {
    if (node.visits === 0) {
      return Infinity;
    }
    const exploitation = node.score / node.visits;
    const exploration = Math.sqrt(
      (this.explorationConstant * Math.log(node.parent?.visits ?? 0)) /
        node.visits
    );

    return exploitation + exploration;
  }

  select(node: Node<T>): Node<T> {
    while (!this.tree.isLeafNode(node)) {
      let maxUcb1 = -Infinity;
      let selectedChild: Node<T> | null = null;

      for (const child of node.children) {
        const ucb1 = this.ucb1(child);
        if (ucb1 > maxUcb1) {
          maxUcb1 = ucb1;
          selectedChild = child;
        }
      }

      if (selectedChild) {
        node = selectedChild;
      } else {
        break;
      }
    }

    return node;
  }

  selectRandom(nodes: Node<T>[]): Node<T> {
    const randomIndex = Math.floor(Math.random() * nodes.length);
    return nodes[randomIndex];
  }

  expand(node: Node<T>): void {
    const possibleMoves = this.getFutureStates(node);

    if (possibleMoves) {
      for (const move of possibleMoves) {
        const child = move;
        node.addChild(child);
      }
    }
  }

  simulate(node: Node<T>): number {
    let current = node;
    while (true) {
      const possibleMoves = this.getFutureStates(current);
      if (!possibleMoves) {
        break;
      }
      current = this.selectRandom(possibleMoves);
    }

    return this.getReward(current);
  }

  backpropagate(node: Node<T>, reward: number): void {
    let currentNode = node;

    while (currentNode !== null) {
      currentNode.visits++;
      currentNode.score += reward;
      currentNode = currentNode.parent as Node<T>;
    }
  }

  bestChild(node: Node<T>): Node<T> | null {
    let bestValue = -Infinity;
    let bestChild: Node<T> | null = null;

    for (const child of node.children) {
      const childValue = child.score / child.visits;
      if (childValue > bestValue) {
        bestValue = childValue;
        bestChild = child;
      }
    }

    return bestChild;
  }

  setExplorationConstant(val: number): void {
    this.explorationConstant = val;
  }

  getBestMove(root: Node<T>, iterations: number): Node<T> | null {
    for (let i = 0; i < iterations; i++) {
      const leaf = this.select(root);
      this.expand(leaf);
      const reward = this.simulate(leaf);
      this.backpropagate(leaf, reward);
    }

    const bestChild = this.bestChild(root);
    return bestChild ?? null;
  }
}
