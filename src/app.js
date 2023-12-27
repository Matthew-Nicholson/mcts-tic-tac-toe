class TicTacToe extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `<p>Tic Tac Toe game will go here</p>`;
  }
}

customElements.define("tic-tac-toe", TicTacToe);
