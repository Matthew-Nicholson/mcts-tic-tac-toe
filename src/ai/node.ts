export class Node {
  constructor(
    public wins: number,
    public visits: number,
    public parentVisits: number,
    public children: Node[],
    public move: number | null,
    public board: number[][]
  ) {
    this.wins = wins;
    this.board = board;
    this.visits = visits;
    this.parentVisits = parentVisits;
    this.children = children;
    this.move = move;
  }
}
