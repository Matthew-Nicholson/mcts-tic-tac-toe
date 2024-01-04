import { TicTacToeGame } from "./game/ticTacToeGame";
import { Square } from "./game/types";
import { isWin } from "./game/utils/isWin";
import { Pieces } from "./shared/types/pieces";
import { PlayerTypes } from "./shared/types/playerTypes";
import "./web/components/gameBoard";
import "./web/components/scoreBoard";
import { cells, getCellValues } from "./web/utils/getCellValues";

class TicTacToe extends HTMLElement {
  private game: TicTacToeGame;

  constructor() {
    super();
    this.game = {} as TicTacToeGame;
  }

  connectedCallback() {
    this.initializeGame(PlayerTypes.human, PlayerTypes.ai);

    this.innerHTML = `
        <h2 class='subtitle'></h2>
        <game-board></game-board>
        <score-board></score-board>
    `;

    const game = this.game;
    const subtitleEl = document.getElementsByClassName("subtitle")[0];

    const handlePlayerToMove = (gameCopy: TicTacToeGame) => {
      subtitleEl.textContent = `${gameCopy.toMove.name} move`;
    };
    handlePlayerToMove(game);

    // Function to add click event to squares
    const handleSquareClick = () => {
      const squares = this.querySelectorAll(".square");

      squares.forEach((square) => {
        square.addEventListener("click", () => {
          // Game won = true
          if (isWin(game.boardState, game.result as Pieces)) return;

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

            handlePlayerToMove(game);
          }

          if (isWin(game.boardState, game.result as Pieces)) {
            subtitleEl.textContent = game.result + " Wins!";
            document.querySelector(".board")?.classList.add("win");
            document
              .querySelectorAll(
                `.board.win .square > .${game.result?.toLowerCase()}`
              )
              .forEach((el) => el.classList.add("win"));
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
