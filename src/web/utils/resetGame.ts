import { TicTacToeGame } from "../../game/ticTacToeGame";

export const resetAlert = (game?: TicTacToeGame) => {
  const alertEl = document.getElementsByClassName("alert")[0];
  alertEl.innerHTML = game ? `<h2>${game.toMove.name} move</h2>` : ``;
};

export const resetGame = (game: TicTacToeGame, className = "win") => {
  document
    .querySelectorAll(`.${className}`)
    .forEach((el) => el.classList.remove(className));
  document
    .querySelectorAll(".board .square")
    .forEach((el) => (el.innerHTML = ""));

  resetAlert(game);
  game.clearBoard();
};
