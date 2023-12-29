import { Pieces } from "../shared/types/pieces";

export type Results = Pieces | "draw" | null;

export type Row = 0 | 1 | 2;

export type Column = 0 | 1 | 2;

export type Square = [Row, Column];
