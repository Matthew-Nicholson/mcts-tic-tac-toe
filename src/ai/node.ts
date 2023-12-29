export class Node<T> {
  constructor(
    public value: T,
    public wins: number,
    public visits: number,
    public parent: Node<T> | null,
    public children: Node<T>[]
  ) {
    this.value = value;
    this.wins = wins;
    this.visits = visits;
    this.parent = parent;
    this.children = children;
  }
}
