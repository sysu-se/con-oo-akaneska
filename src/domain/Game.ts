import { Sudoku } from './Sudoku';

export class Game {
  private _current: Sudoku;
  private _history: Sudoku[] = [];
  private _redoStack: Sudoku[] = [];

  constructor(initial: Sudoku) {
    this._current = initial.clone();
    this._history.push(this._current.clone());
  }

  public setCell(row: number, col: number, value: number): void {
    this._current.setCell(row, col, value);
    this._history.push(this._current.clone());
    this._redoStack = [];
  }

  public undo(): boolean {
    if (this._history.length <= 1) return false;
    this._redoStack.push(this._current.clone());
    this._history.pop();
    this._current = this._history[this._history.length - 1].clone();
    return true;
  }

  public redo(): boolean {
    if (this._redoStack.length === 0) return false;
    const next = this._redoStack.pop()!;
    this._current = next.clone();
    this._history.push(next.clone());
    return true;
  }

  get grid(): number[][] {
    return this._current.grid;
  }

  get sudoku(): Sudoku {
    return this._current.clone();
  }
}