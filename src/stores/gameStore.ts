import { writable } from 'svelte/store';
import { Game } from '../domain/Game';
import { Sudoku } from '../domain/Sudoku';

const empty = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9],
];

export function createGameStore() {
  const game = new Game(new Sudoku(empty));

  const { subscribe, update } = writable({
    grid: game.grid,
    solved: false,
  });

  function sync() {
    update(s => ({
      grid: game.grid,
      solved: game.sudoku.isSolved(),
    }));
  }

  return {
    subscribe,
    setCell: (r: number, c: number, v: number) => {
      game.setCell(r, c, v);
      sync();
    },
    undo: () => {
      const ok = game.undo();
      sync();
      return ok;
    },
    redo: () => {
      const ok = game.redo();
      sync();
      return ok;
    },
  };
}

export const gameStore = createGameStore();