const Sudoku = require('./Sudoku').Sudoku;

class Game {
  constructor(initialSudoku) {
    this._history = [initialSudoku.clone()];
    this._pointer = 0;
  }

  guess(move) {
    const current = this._history[this._pointer].clone();
    current.guess(move);

    this._history = this._history.slice(0, this._pointer + 1);
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