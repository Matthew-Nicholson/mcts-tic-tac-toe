import { Node } from "./node";

export function convertToNode<T>(val: T, parent = null): Node<T> {
  return new Node(val, 0, 0, parent, []);
}
