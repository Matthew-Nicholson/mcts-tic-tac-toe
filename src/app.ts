import { TicTacToeGame } from "./game/ticTacToeGame";
import { Square } from "./game/types";
import { PlayerTypes } from "./shared/types/playerTypes";
import "./web/components/gameBoard";
import { cells, getCellValues } from "./web/utils/getCellValues";

const game = new TicTacToeGame(PlayerTypes.human, PlayerTypes.ai);

class TicTacToe extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class='game'>
         <game-board></game-board>
      </section>
    `;

    // Function to add click event to squares
    const handleSquareClick = () => {
      const squares = this.querySelectorAll(".square");

      squares.forEach((square) => {
        square.addEventListener("click", () => {
          const cellValues: Square = getCellValues(
            square.className.split(" "),
            cells
          );

          // game.makeMove(cellValues);
          console.info(cellValues);
        });
      });
    };
    handleSquareClick();
  }
}

customElements.define("tic-tac-toe", TicTacToe);
