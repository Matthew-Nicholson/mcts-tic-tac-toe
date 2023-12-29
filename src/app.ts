import "./web/components/gameBoard";

class TicTacToe extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <section class='game'>
         <game-board></game-board>
      </section>
    `;
  }
}

customElements.define("tic-tac-toe", TicTacToe);
