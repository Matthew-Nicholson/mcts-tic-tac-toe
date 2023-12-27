import { GameTypes } from "../shared/types/gameTypes";
import { PlayerTypes } from "../shared/types/playerTypes";

export interface TicTacToe {
  gameType: GameTypes;
  piecesEnum: { x: string; o: string };
  toMove: PlayerTypes;
  board: string[][];
  print(): void;
  placeMove(row: number, column: number, piece: string): void;
  isWin(): boolean;
  isDraw(): boolean;
  isGameOver(): boolean;
  getLegalMoves(): [number, number][];
}
