import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Car, GameState, Move } from './models';

function getOccupiedGrid(state: GameState): (string | null)[][] {
  const grid: (string | null)[][] = Array.from({
    length: state.boardSize
  }, () => Array.from({ length: state.boardSize }, () => null));
  for (const car of state.cars) {
    const dx = car.orientation === 'horizontal' ? 1 : 0;
    const dy = car.orientation === 'vertical' ? 1 : 0;
    for (let i = 0; i < car.length; i++) {
      const x = car.x + dx * i;
      const y = car.y + dy * i;
      grid[y][x] = car.id;
    }
  }
  return grid;
}

function isMoveLegal(state: GameState, move: Move): boolean {
  const car = state.cars.find(c => c.id === move.carId);
  if (!car) return false;
  const { boardSize } = state;
  const grid = getOccupiedGrid(state);
  const dx = move.direction === 'left' ? -1 : move.direction === 'right' ? 1 : 0;
  const dy = move.direction === 'up' ? -1 : move.direction === 'down' ? 1 : 0;
  if (car.orientation === 'horizontal' && dy !== 0) return false;
  if (car.orientation === 'vertical' && dx !== 0) return false;
  // check path
  for (let step = 1; step <= move.steps; step++) {
    const headX = dx < 0 ? car.x - step : car.x + (car.orientation === 'horizontal' ? car.length - 1 : 0) + dx * step;
    const headY = dy < 0 ? car.y - step : car.y + (car.orientation === 'vertical' ? car.length - 1 : 0) + dy * step;
    if (headX < 0 || headY < 0 || headX >= boardSize || headY >= boardSize) {
      return false;
    }
    const occupant = grid[headY][headX];
    if (occupant && occupant !== car.id) {
      return false;
    }
    if (!car.isMain && headX === boardSize - 1 && headY === car.y) {
      return false;
    }
  }
  return true;
}

function applyMove(state: GameState, move: Move): GameState {
  if (!isMoveLegal(state, move)) return state;
  const carIndex = state.cars.findIndex(c => c.id === move.carId);
  if (carIndex === -1) return state;
  const car = state.cars[carIndex];
  const dx = move.direction === 'left' ? -1 : move.direction === 'right' ? 1 : 0;
  const dy = move.direction === 'up' ? -1 : move.direction === 'down' ? 1 : 0;
  const updated: Car = { ...car, x: car.x + dx * move.steps, y: car.y + dy * move.steps };
  const cars = state.cars.slice();
  cars[carIndex] = updated;
  const isMainCleared =
    updated.isMain &&
    updated.orientation === 'horizontal' &&
    updated.x + updated.length - 1 === state.boardSize - 1;
  return {
    ...state,
    cars,
    moveCount: state.moveCount + 1,
    history: [...state.history, move],
    isCleared: state.isCleared || isMainCleared
  };
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _state = new BehaviorSubject<GameState>(initialState());
  readonly state$ = this._state.asObservable();

  get boardSize(): number {
    return this._state.getValue().boardSize;
  }

  move(move: Move): void {
    const current = this._state.getValue();
    const next = applyMove(current, move);
    if (next !== current) {
      this._state.next(next);
    }
  }
}

function initialState(): GameState {
  return {
    boardSize: 6,
    cars: [
      { id: 'R', isMain: true, orientation: 'horizontal', length: 2, x: 0, y: 2 },
      { id: 'A', isMain: false, orientation: 'vertical', length: 3, x: 3, y: 0 },
      { id: 'B', isMain: false, orientation: 'horizontal', length: 2, x: 1, y: 0 }
    ],
    moveCount: 0,
    isCleared: false,
    history: []
  };
}

export { getOccupiedGrid, isMoveLegal, applyMove };
