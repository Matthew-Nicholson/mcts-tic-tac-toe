import { Column, Row } from "../game/types";

export interface Rows {
  top: Row;
  bottom: Row;
}

export interface Columns {
  left: Column;
  right: Column;
}

export type Cells = {
  rows: Rows;
  columns: Columns;
  default: 1;
};
