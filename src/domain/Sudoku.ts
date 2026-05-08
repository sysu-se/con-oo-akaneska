export class Sudoku {
  private _grid: number[][];
  private _initialGrid: number[][];

  constructor(grid: number[][]) {
    this._initialGrid = JSON.parse(JSON.stringify(grid));
    this._grid = JSON.parse(JSON.stringify(grid));
  }

  get grid(): number[][] {
    return JSON.parse(JSON.stringify(this._grid));
  }

  public setCell(row: number, col: number, value: number): void {
    if (this._initialGrid[row][col] !== 0) return;
    this._grid[row][col] = value;
  }

  public getCell(row: number, col: number): number {
    return this._grid[row][col];
  }

  public isSolved(): boolean {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (this._grid[r][c] === 0) return false;
        if (!this.isValid(r, c, this._grid[r][c])) return false;
      }
    }
    return true;
  }

  private isValid(row: number, col: number, value: number): boolean {
    for (let c = 0; c < 9; c++) {
      if (c !== col && this._grid[row][c] === value) return false;
    }
    for (let r = 0; r < 9; r++) {
      if (r !== row && this._grid[r][col] === value) return false;
    }
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;
    for (let r = br; r < br + 3; r++) {
      for (let c = bc; c < bc + 3; c++) {
        if (r === row && c === col) continue;
        if (this._grid[r][c] === value) return false;
      }
    }
    return true;
  }

  public clone(): Sudoku {
    return new Sudoku(this._grid);
  }

  public serialize(): string {
    return JSON.stringify(this._grid);
  }

  public static deserialize(json: string): Sudoku {
    const grid = JSON.parse(json);
    return new Sudoku(grid);
  }
}