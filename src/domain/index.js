const { Sudoku } = require('./Sudoku');
const { Game } = require('./Game');

function createSudoku(grid) {
  return new Sudoku(grid);
}

function createSudokuFromJSON(jsonObj) {
  return new Sudoku(jsonObj);
}

function createGame({ sudoku }) {
  if (!sudoku) {
    throw new Error('Game requires a sudoku instance');
  }
  const game = new Game(sudoku);
  
  return game;
}

function createGameFromJSON(json) {
  const sudoku = createSudokuFromJSON(json.sudoku);
  const game = createGame({ sudoku });
  
  if (json.history) {
    game._history = json.history.map(h => createSudokuFromJSON(h));
  }
  if (json.pointer !== undefined) {
    game._pointer = json.pointer;
  }
  if (json.redoStack) {
    game._redoStack = json.redoStack.map(r => createSudokuFromJSON(r));
  }
  
  return game;
}

module.exports = {
  createSudoku,
  createSudokuFromJSON,
  createGame,
  createGameFromJSON
};