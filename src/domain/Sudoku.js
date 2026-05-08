class Sudoku {
  constructor(grid) {
    this._grid = JSON.parse(JSON.stringify(grid));
  }

  guess(move) {
    const { row, col, value } = move;
    this._grid[row][col] = value;
  }

  getGrid() {
    return JSON.parse(JSON.stringify(this._grid));
  }

  clone() {
    return new Sudoku(this.getGrid());
  }

  toString() {
    return this._grid.map(row => row.join('')).join('\n');
  }

  toJSON() {
    return this.getGrid();
  }
}

module.exports = { Sudoku };