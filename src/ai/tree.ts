import { Node } from "./node";

export class Tree<T> {
  root: Node<T> | null = null;
  constructor() {}
  addRoot(node: Node<T>) {
    if (this.root) {
      return this;
    }
    this.root = node;
    return this;
  }

  replaceRoot(node: Node<T>) {
    this.root = node;
    return this;
  }

  getRoot(): Node<T> | null {
    return this.root;
  }

  addNode(parentNode: Node<T>, node: Node<T>) {
    parentNode.addChild(node);
    return this;
  }

  getChildren(node: Node<T>): Node<T>[] {
    return node.children;
  }

  getParent(node: Node<T>): Node<T> | null {
    return node.parent;
  }

  getValue(node: Node<T>): T {
    return node.value;
  }

  isLeafNode(node: Node<T>): boolean {
    return node.children.length === 0;
  }
}
