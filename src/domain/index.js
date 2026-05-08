const { Sudoku } = require('./Sudoku');
const { Game } = require('./Game');

function createSudoku(grid) {
  return new Sudoku(grid);
}

function createSudokuFromJSON(jsonObj) {
  return new Sudoku(jsonObj);
}

function createGame(sudoku) {
  return new Game(sudoku);
}

function createGameFromJSON(jsonObj) {
  const sudoku = new Sudoku(jsonObj);
  return new Game(sudoku);
}

module.exports = {
  createSudoku,
  createSudokuFromJSON,
  createGame,
  createGameFromJSON
};