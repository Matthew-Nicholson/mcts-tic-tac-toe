import { TicTacToeGame } from "./game/ticTacToeGame";
import { Square } from "./game/types";
import { PlayerTypes } from "./shared/types/playerTypes";
import "./web/components/gameBoard";
import "./web/components/scoreBoard";
import { cells, getCellValues } from "./web/utils/getCellValues";

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);

class TicTacToe extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <h2 class='to_move'></h2>
        <game-board></game-board>
        <score-board></score-board>
    `;

    const handlePlayerToMove = (gameCopy: TicTacToeGame) => {
      document.getElementsByClassName("to_move")[0].textContent =
        `${gameCopy.toMove.name} move`;
    };
    handlePlayerToMove(game);

    // Function to add click event to squares
    const handleSquareClick = () => {
      const squares = this.querySelectorAll(".square");

      squares.forEach((square) => {
        square.addEventListener("click", () => {
          const cellValues: Square = getCellValues(
            square.className.split(" "),
            cells
          );

          if (game.isLegalMove(cellValues, game.boardState)) {
            square.innerHTML = `<div class='${game.toMove.piece.toLocaleLowerCase()}'></div>`;

            game.makeMove(cellValues);
            game.setResult(game.toMove.piece);

            handlePlayerToMove(game);
          }
        });
      });
    };
    handleSquareClick();
  }
}

customElements.define("tic-tac-toe", TicTacToe);
