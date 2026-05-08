class Sudoku {
  constructor(grid) {
    // 防御性拷贝：测试要求"defensively copies the input grid"
    this._grid = JSON.parse(JSON.stringify(grid));
  }

  guess(row, col, value) {
    this._grid[row][col] = value;
  }

  getGrid() {
    // 返回深拷贝，避免外部修改
    return JSON.parse(JSON.stringify(this._grid));
  }

  clone() {
    return new Sudoku(this.getGrid());
  }

  toString() {
    // 测试要求：返回可读字符串，不能是[object Object]
    return this._grid.map(row => row.join('')).join('\n');
  }

  toJSON() {
    // 测试要求：返回可序列化的纯数据
    return this.getGrid();
  }
}

module.exports = { Sudoku };