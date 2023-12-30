import type { BoardState } from "../shared/types/boardState";
import { Pieces } from "../shared/types/pieces";
import { PlayerTypes } from "../shared/types/playerTypes";
import { getInitialPosition } from "../shared/utils/getInitialPosition";
import type { Results, Square } from "./types";
import { getLegalMoves } from "./utils/getLegalMoves";
import { isGameOver } from "./utils/isGameOver";

interface Player {
  name: string;
  type: PlayerTypes;
  piece: Pieces;
}
export class TicTacToeGame {
  playerX: Player;
  playerO: Player;
  boardState = getInitialPosition();
  moveHistory = [getInitialPosition()];
  result: Results = null;
  toMove;

  constructor(playerX: PlayerTypes, playerO: PlayerTypes) {
    this.playerX = {
      name: "Player X",
      type: playerX,
      piece: Pieces.x,
    };
    this.playerO = {
      name: "Player O",
      type: playerO,
      piece: Pieces.o,
    };
    this.toMove = this.playerX;
  }

  getBoardState(): BoardState {
    return this.boardState;
  }

  setTurn(player: Player): void {
    this.toMove = player;
  }

  toggleSideToMove(): void {
    this.toMove = this.toMove === this.playerX ? this.playerO : this.playerX;
  }

  getSideToMove(): Player {
    return this.toMove;
  }

  makeMove(square: Square) {
    if (!this.isLegalMove(square)) return;

    this.boardState[square[0]][square[1]] = this.toMove.piece;

    this.addToHistory(this.boardState);

    this.toggleSideToMove();

    return this;
  }

  get legalMoves(): Square[] {
    return getLegalMoves(this.boardState);
  }

  isLegalMove(square: Square, board = this.getBoardState()): boolean {
    return board[square[0]][square[1]] === "";
  }

  getMoveHistory(): BoardState[] {
    return this.moveHistory;
  }

  getResult(): Results {
    return this.result;
  }

  setResult(result: Pieces | "draw" | null): void {
    this.result = result;
  }

  newGame(playerX: PlayerTypes, playerO: PlayerTypes) {
    return new TicTacToeGame(playerX, playerO);
  }

  clearBoard() {
    this.boardState = getInitialPosition();
    return this;
  }

  addToHistory(board: BoardState): void {
    this.moveHistory.push(board);
  }

  isGameOver() {
    return isGameOver(this.getBoardState());
  }

  print(): void {
    console.log("\n");
    this.boardState.forEach((row, i) => {
      console.log(row.map((cell) => cell || " ").join(" | "));
      if (i < this.boardState.length - 1) {
        console.log("---------");
      }
    });
    console.log("\n");
  }
}

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);
