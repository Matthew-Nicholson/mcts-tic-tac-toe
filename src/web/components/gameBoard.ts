class GameBoard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class='board'>
          <div class='square top left'></div>
          <div class='square top'></div>
          <div class='square top right'></div>
          
          <div class='square left'></div>
          <div class='square'></div>
          <div class='square right'></div>
          
          <div class='square bottom left'></div>
          <div class='square bottom'></div>
          <div class='square bottom right'></div>
        </div>
    `;
  }
}

customElements.define("game-board", GameBoard);
