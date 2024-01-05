import { Square } from "../../game/types";
import { Cells, Columns, Rows } from "../types";

export const cells: Cells = {
  rows: { top: 0, bottom: 2 },
  columns: { left: 0, right: 2 },
  default: 1,
};

export const getCellValues = (classnames: string[], cells: Cells): Square => {
  type Grid = Rows | Columns;

  const getGridValue = (grid: Grid) =>
    classnames.find((className) => Object.keys(grid).includes(className));

  const getGridResult = (gridValue: string | undefined, grid: Grid) =>
    gridValue ? grid[gridValue as keyof Grid] : cells.default;

  const rowValue = getGridValue(cells.rows);
  const colValue = getGridValue(cells.columns);

  const rowResult = getGridResult(rowValue, cells.rows);
  const colResult = getGridResult(colValue, cells.columns);

  return [rowResult, colResult];
};
