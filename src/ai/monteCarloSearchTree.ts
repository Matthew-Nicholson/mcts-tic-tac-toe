import { calculateUCB1 } from "./calculateUCB1";
import type { Node } from "./types";

export class MonteCarloSearchTree<T> {
  initialNode: Node<T>;
  getOptions: (node: Node<T>) => Node<T>[];
  isTerminal: (node: Node<T>) => boolean;
  evaluation: number | null;
  nodeUnderEvaluation: Node<T> | null;
  constructor(
    initialNode: Node<T>,
    getOptionsCb: (node: Node<T>) => Node<T>[],
    isTerminalCb: (node: Node<T>) => boolean
  ) {
    this.initialNode = initialNode;
    this.getOptions = getOptionsCb;
    this.isTerminal = isTerminalCb;
    this.evaluation = null;
    this.nodeUnderEvaluation = null;
  }

  isLeafNode(node: Node<T>): boolean {
    return node.children.length === 0;
  }

  getUCB1(node: Node<T>): number {
    return calculateUCB1(node.wins, node.visits, node.parent?.visits ?? 0);
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
}
