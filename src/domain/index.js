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
  return new Game(sudoku);
}

function createGameFromJSON(json) {
  const sudoku = createSudokuFromJSON(json.sudoku);
  return createGame({ sudoku });
}

module.exports = {
  createSudoku,
  createSudokuFromJSON,
  createGame,
  createGameFromJSON
};