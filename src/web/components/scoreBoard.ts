class ScoreBoard extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <div class='score-board'>
          <div class='player p_x'>Player (X)</div>
          <div class='player p_o'>Player (O)</div>
        </div>
    `;
  }
}

customElements.define("score-board", ScoreBoard);
