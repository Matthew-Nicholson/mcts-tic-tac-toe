import { GameTypes } from "../shared/types/gameTypes";
import { PlayerTypes } from "../shared/types/playerTypes";
import type { TicTacToe as TicTacToeType } from "./types";

export class TicTacToeGame implements TicTacToeType {
  gameType: TicTacToeType["gameType"];
  toMove: TicTacToeType["toMove"];
  board: string[][];
  constructor(toMove = PlayerTypes.player1, gameType = GameTypes.twoPlayer) {
    this.gameType = GameTypes[gameType];

    this.toMove = PlayerTypes[toMove];

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  print() {
    console.log("\n");
    this.board.forEach((row, i) => {
      console.log(row.map((cell) => cell || " ").join(" | "));
      if (i < this.board.length - 1) {
        console.log("---------");
      }
    });
    console.log("\n");
  }

  /** Forcibly makes a move. Does not check for legality */
  placeMove(row, column, piece) {
    this.board[row][column] = piece;
  }

  isWin() {
    const lines = [
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    for (const line of lines) {
      if (line.every((value, i, arr) => value && value === arr[0])) {
        return true;
      }
    }
    return false; // Added return statement for the case when there is no win
  }

  isDraw() {
    return !this.isWin() && this.board.flat().every((cell) => cell !== "");
  }

  isGameOver() {
    return this.isWin() || this.isDraw();
  }

  getLegalMoves() {
    const moves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j]) {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }
}

}

export class TicTacToe {
  gameType: string;
  piecesEnum: { x: string; o: string; };
  eventsEnum: { gameStart: number; player1Moved: number; player2Moved: number; aiMoved: number; gameOver: number; };
  toMove: string;
  board: string[][];
  constructor(toMove = PlayerTypes.player1, gameType = GameTypes.twoPlayer) {
    this.gameType = GameTypes[gameType];

    this.piecesEnum = {
      x: "X",
      o: "O",
    };

    this.eventsEnum = {
      gameStart: 0,
      player1Moved: 1,
      player2Moved: 2,
      aiMoved: 3,
      gameOver: 4,
    };

    this.toMove = PlayerTypes[toMove];

    this.board = [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ];
  }

  print() {
    console.log("\n");
    this.board.forEach((row, i) => {
      console.log(row.map((cell) => cell || " ").join(" | "));
      if (i < this.board.length - 1) {
        console.log("---------");
      }
    });
    console.log("\n");
  }

  /** Forcibly makes a move. Does not check for legality */
  placeMove(row, column, piece) {
    this.board[row][column] = piece;
  }

  isWin() {
    const lines = [
      [this.board[0][0], this.board[0][1], this.board[0][2]],
      [this.board[1][0], this.board[1][1], this.board[1][2]],
      [this.board[2][0], this.board[2][1], this.board[2][2]],
      [this.board[0][0], this.board[1][0], this.board[2][0]],
      [this.board[0][1], this.board[1][1], this.board[2][1]],
      [this.board[0][2], this.board[1][2], this.board[2][2]],
      [this.board[0][0], this.board[1][1], this.board[2][2]],
      [this.board[0][2], this.board[1][1], this.board[2][0]],
    ];

    for (const line of lines) {
      if (line.every((value, i, arr) => value && value === arr[0])) {
        return true;
      }
    }
  }

  isDraw() {
    return !this.isWin() && this.board.flat().every((cell) => cell !== "");
  }

  isGameOver() {
    return this.isWin() || this.isDraw();
  }

  getLegalMoves() {
    const moves = [];
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (!this.board[i][j]) {
          moves.push([i, j]);
        }
      }
    }
    return moves;
  }
}
const game = new TicTacToe();
game.print();
game.placeMove(0, 0, game.piecesEnum.x);
game.print();
game.placeMove(1, 1, game.piecesEnum.o);
game.print();
game.placeMove(0, 2, game.piecesEnum.x);
game.print();
console.log(game.getLegalMoves());
