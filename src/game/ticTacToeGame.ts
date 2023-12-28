import { eventHandler } from "../events/events";
import { Event } from "../events/types";
import { GameTypes } from "../shared/types/gameTypes";
import { PlayerTypes } from "../shared/types/playerTypes";
import type { TicTacToe as TicTacToeType } from "./types";

export class TicTacToe {
  gameType: string;
  piecesEnum: { x: string; o: string };
  eventsEnum: {
    gameStart: number;
    player1Moved: number;
    player2Moved: number;
    aiMoved: number;
    gameOver: number;
  };
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

  //This should reset the board. X will be the first one to go
  newGame() {
    this.clearBoard();
  }

  /** Forcibly makes a move. Does not check for legality */
  placeMove(row: number, column: number, piece: string) {
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

  isLegalMove(row: number, column: number) {
    let currentMove = [row, column];
    for (let i = 0; i < this.getLegalMoves().length; i++) {
      let rowValue = this.getLegalMoves()[i][0];
      let columnValue = this.getLegalMoves()[i][1];

      if (currentMove[0] == rowValue && currentMove[1] == columnValue) {
        return true;
      }
    }

    return false;
  }

  clearBoard() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = "";
      }
    }
  }

  //Retrieves the board
  getBoardState() {
    this.print();
  }
}

const game = new TicTacToe();
let isPlaying = true;
let playerOneTurn = true;
let playerTwoTurn = false;
game.newGame();
console.log("Player 1 is X");
console.log("Player 2 is O");

let value = "X";

const prompt = require("prompt-sync")({ sigint: true });

while (isPlaying) {
  if (playerOneTurn) console.log("Player One\n");
  else console.log("Player Two\n");

  value = playerOneTurn ? "X" : "O";
  let rowValue = prompt(`Insert Row to place ${value}: `);
  let columnValue = prompt(`Insert Column to place ${value}: `);

  if (game.isLegalMove(rowValue, columnValue)) {
    if (playerOneTurn) {
      game.placeMove(rowValue, columnValue, game.piecesEnum.x);
      playerOneTurn = false;
      playerTwoTurn = true;
    } else {
      game.placeMove(rowValue, columnValue, game.piecesEnum.o);
      playerOneTurn = true;
      playerTwoTurn = false;
    }
    game.getBoardState();
    if (game.isWin()) {
      console.log("Winner");
      isPlaying = false;
    } else if (game.isDraw()) {
      console.log("Draw");
      playerOneTurn = true;
      playerTwoTurn = false;
      game.newGame();
    }
  } else {
    console.log("That move is invalid\n");
  }
}

// if (game.isLegalMove(0, 0)) {
//   game.placeMove(0, 0, game.piecesEnum.x);
// }
// if (game.isLegalMove(0, 0)) {
//   game.placeMove(0, 0, game.piecesEnum.o);
// }
// game.print();
// game.clearBoard();

// while(true)
// {

// }

// eventHandler.subscribe(Event.gameStart, game.newGame);

// eventHandler.subscribe(Event.player1Moved, () =>
//   game.isLegalMove(0, 0, game.piecesEnum.o)
// );

// eventHandler.subscribe(Event.player1Moved, () => game.print());

// eventHandler.publish(Event.gameStart, {});
// eventHandler.publish(Event.player1Moved, {});
// game.isLegalMove(0, 0, game.piecesEnum.x);

// game.placeMove(0, 0, game.piecesEnum.x);
// game.print();
// game.placeMove(1, 1, game.piecesEnum.o);
// game.print();
// game.placeMove(0, 2, game.piecesEnum.x);
// game.print();
// console.log(game.getLegalMoves());
