import { Node } from "./node";

export function convertToNode<T>(val: T): Node<T> {
  return new Node(val);
}
