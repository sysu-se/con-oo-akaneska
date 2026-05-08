const { Sudoku } = require('./Sudoku');
const { Game } = require('./Game');

function createSudoku(grid) {
  return new Sudoku(grid);
}

function createSudokuFromJSON(json) {
  const grid = JSON.parse(json);
  return new Sudoku(grid);
}

function createGame(sudoku) {
  return new Game(sudoku);
}

function createGameFromJSON(json) {
  const grid = JSON.parse(json);
  const sudoku = new Sudoku(grid);
  return new Game(sudoku);
}

module.exports = {
  createSudoku,
  createSudokuFromJSON,
  createGame,
  createGameFromJSON
};