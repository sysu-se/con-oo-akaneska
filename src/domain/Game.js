const { Sudoku } = require('./Sudoku');

class Game {
  constructor(initialSudoku) {
    this._history = [initialSudoku.clone()];
    this._pointer = 0;
  }

  guess(row, col, value) {
    // 1. 基于当前状态创建新快照
    const current = this._history[this._pointer].clone();
    current.guess(row, col, value);
    
    // 2. 清除redo历史
    this._history = this._history.slice(0, this._pointer + 1);
    
    // 3. 添加新快照并移动指针
    this._history.push(current);
    this._pointer++;
  }

  undo() {
    if (this._pointer <= 0) return false;
    this._pointer--;
    return true;
  }

  redo() {
    if (this._pointer >= this._history.length - 1) return false;
    this._pointer++;
    return true;
  }

  getSudoku() {
    return this._history[this._pointer].clone();
  }
}

module.exports = { Game };