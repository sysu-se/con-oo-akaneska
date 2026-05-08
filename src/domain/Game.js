const Sudoku = require('./Sudoku').Sudoku;

class Game {
  constructor(initialSudoku) {
    if (typeof initialSudoku.clone !== 'function') {
      throw new Error('Game requires a sudoku instance with clone method');
    }
    this.initialSudoku = initialSudoku;
    this.currentSudoku = initialSudoku.clone();
    this._history = [initialSudoku.clone()];
    this._pointer = 0;
    this._redoStack = [];
  }

  guess(move) {
    const current = this._history[this._pointer].clone();
    current.guess(move);

    this._history = this._history.slice(0, this._pointer + 1);
    this._history.push(current);
    this._pointer++;
    
    this._redoStack = [];
  }

  undo() {
    if (this._pointer <= 0) return false;
    this._redoStack.push(this._history[this._pointer]);
    this._pointer--;
    return true;
  }

  redo() {
    if (this._redoStack.length === 0) return false;
    this._pointer++;
    this._history[this._pointer] = this._redoStack.pop();
    return true;
  }

  canUndo() {
    return this._pointer > 0;
  }

  canRedo() {
    return this._redoStack.length > 0;
  }

  getSudoku() {
    return this._history[this._pointer].clone();
  }

  toJSON() {
    return {
      sudoku: this._history[this._pointer].toJSON(),
      history: this._history.map(h => h.toJSON()),
      pointer: this._pointer,
      redoStack: this._redoStack.map(r => r.toJSON())
    };
  }
}

module.exports = { Game };