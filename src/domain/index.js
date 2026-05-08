import { Sudoku } from './Sudoku';
import { Game } from './Game';

export function createSudoku(grid) {
  return new Sudoku(grid);
}

export function createGame(sudoku) {
  return new Game(sudoku);
}