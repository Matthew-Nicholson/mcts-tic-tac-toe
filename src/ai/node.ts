export class Node<T> {
  public children: Node<T>[] = [];
  public parent: Node<T> | null = null;
  public wins: number = 0;
  public visits: number = 0;

  constructor(public value: T) {
    this.value = value;
  }

  addChild(node: Node<T>) {
    this.children.push(node);
    node.parent = this;
  }
}
