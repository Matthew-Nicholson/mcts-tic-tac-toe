import type { Node } from "./types";

export function isLeafNode(node: Node): boolean {
  return node.children.length === 0;
}
