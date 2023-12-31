import type { BoardState } from "../shared/types/boardState";
import { Pieces } from "../shared/types/pieces";
import { PlayerTypes } from "../shared/types/playerTypes";
import { SquareState } from "../shared/types/squareState";
import { getInitialPosition } from "../shared/utils/getInitialPosition";
import type { Results, Square } from "./types";
import { getLegalMoves } from "./utils/getLegalMoves";
import { isGameOver } from "./utils/isGameOver";
import { potentialMoveOptions } from "./utils/potentialMoveOptions";

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
      piece: Pieces.X,
    };
    this.playerO = {
      name: "Player O",
      type: playerO,
      piece: Pieces.O,
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

  get potentialMoveOptions(): SquareState[][][] {
    return potentialMoveOptions(
      this.legalMoves,
      this.boardState,
      this.toMove.piece
    );
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

  // potentialMoveOptions = (squares: Square[], board = this.getBoardState()) => {
  //   if (isGameOver(board) || squares.length == 0) return [];
  //   let potentialBoardOptions = [];
  //   let copyOfBoard;
  //   for (let i = 0; i < squares.length; i++) {
  //     copyOfBoard = board.map((row) => [...row]);
  //     let row = squares[i][0];
  //     let column = squares[i][1];
  //     copyOfBoard[row][column] = game.toMove.piece;
  //     potentialBoardOptions.push(copyOfBoard);
  //   }
  //   return potentialBoardOptions;
  // };

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

