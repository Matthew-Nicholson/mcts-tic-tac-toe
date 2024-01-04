import "./web/components/gameBoard";
import "./web/components/scoreBoard";

import { TicTacToeGame } from "./game/ticTacToeGame";
import { Square } from "./game/types";
import { isDraw } from "./game/utils/isDraw";
import { isWin } from "./game/utils/isWin";
import { Pieces } from "./shared/types/pieces";
import { PlayerTypes } from "./shared/types/playerTypes";

import { cells, getCellValues } from "./web/utils/getCellValues";
import { resetAlert, resetGame } from "./web/utils/resetGame";

class TicTacToe extends HTMLElement {
  private game: TicTacToeGame;

  constructor() {
    super();
    this.game = {} as TicTacToeGame;
  }

  connectedCallback() {
    this.initializeGame(PlayerTypes.human, PlayerTypes.ai);

    this.innerHTML = `
        <div class='alert'></div>
        <game-board></game-board>
    `;

    const game = this.game;
    const alertEl = document.getElementsByClassName("alert")[0];

    resetAlert(game);

    // Function to add click event to squares
    const handleSquareClick = () => {
      const squares = this.querySelectorAll(".square");

      const gameOverAlert = (title: string) =>
        (alertEl.innerHTML = `
              <h2>${title}</h2>
              <span>Click to play again</span>
            `);

      squares.forEach((square) => {
        square.addEventListener("click", () => {
          // Game tie
          if (isDraw(game.boardState)) {
            resetGame(game, "tie");
            return;
          }

          // Game won = true
          if (isWin(game.boardState, game.result as Pieces)) {
            resetGame(game);
            return;
          }

          // Game won = false
          const cellValues: Square = getCellValues(
            square.className.split(" "),
            cells
          );

          if (game.isLegalMove(cellValues, game.boardState)) {
            square.innerHTML = `<div class='${game.toMove.piece.toLocaleLowerCase()}'></div>`;

            game.makeMove(cellValues);
            game.setResult(
              game.toMove.type === game.playerX.type
                ? game.playerO.piece
                : game.playerX.piece
            );

            resetAlert(game);
          }

          if (isWin(game.boardState, game.result as Pieces)) {
            gameOverAlert(game.result + " Wins!");
            document.querySelector(".board")?.classList.add("win");
            document
              .querySelectorAll(
                `.board.win .square > .${game.result?.toLowerCase()}`
              )
              .forEach((el) => el.classList.add("win"));
          }

          if (isDraw(game.boardState)) {
            gameOverAlert("DRAW!");
            document.querySelector(".board")?.classList.add("tie");
          }
        });
      });
    };
    handleSquareClick();
  }

  private initializeGame(player1: PlayerTypes, player2: PlayerTypes) {
    this.game = new TicTacToeGame(player1, player2);
  }
}

customElements.define("tic-tac-toe", TicTacToe);
