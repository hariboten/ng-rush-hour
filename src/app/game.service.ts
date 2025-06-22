import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Car {
  id: string;
  isMain: boolean;
  orientation: 'horizontal' | 'vertical';
  length: 2 | 3;
  x: number;
  y: number;
}

export interface Move {
  carId: string;
  direction: 'left' | 'right' | 'up' | 'down';
  steps: number;
}

export interface GameState {
  boardSize: number;
  cars: Car[];
  moveCount: number;
  isCleared: boolean;
  history: Move[];
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private readonly _state = new BehaviorSubject<GameState>({
    boardSize: 6,
    cars: [],
    moveCount: 0,
    isCleared: false,
    history: []
  });

  readonly state$ = this._state.asObservable();

  private get state(): GameState {
    return this._state.value;
  }

  /** Update entire game state */
  setState(state: GameState): void {
    this._state.next(state);
  }

  /**
   * 盤面占有状態を取得する。grid[y][x] が車 ID または null を返す。
   */
  getOccupiedGrid(state: GameState = this.state): (string | null)[][] {
    const grid = Array.from({ length: state.boardSize }, () =>
      Array<string | null>(state.boardSize).fill(null)
    );

    for (const car of state.cars) {
      for (let i = 0; i < car.length; i++) {
        const x = car.orientation === 'horizontal' ? car.x + i : car.x;
        const y = car.orientation === 'vertical' ? car.y + i : car.y;
        if (x >= 0 && x < state.boardSize && y >= 0 && y < state.boardSize) {
          grid[y][x] = car.id;
        }
      }
    }

    return grid;
  }

  /**
   * 指定された移動が合法かどうか判定する。
   */
  isMoveLegal(move: Move, state: GameState = this.state): boolean {
    const car = state.cars.find(c => c.id === move.carId);
    if (!car) {
      return false;
    }

    if (car.orientation === 'horizontal' && (move.direction === 'up' || move.direction === 'down')) {
      return false;
    }
    if (car.orientation === 'vertical' && (move.direction === 'left' || move.direction === 'right')) {
      return false;
    }
    if (move.steps < 1) {
      return false;
    }

    const grid = this.getOccupiedGrid(state);
    const dx = move.direction === 'left' ? -1 : move.direction === 'right' ? 1 : 0;
    const dy = move.direction === 'up' ? -1 : move.direction === 'down' ? 1 : 0;

    for (let step = 1; step <= move.steps; step++) {
      const checkX =
        dx === 1
          ? car.x + car.length - 1 + step
          : dx === -1
          ? car.x - step
          : car.x;
      const checkY =
        dy === 1
          ? car.y + car.length - 1 + step
          : dy === -1
          ? car.y - step
          : car.y;

      if (checkX < 0 || checkX >= state.boardSize || checkY < 0 || checkY >= state.boardSize) {
        return false;
      }

      const exitY = this.getMainCar(state)?.y ?? 0;
      if (!car.isMain && checkX === state.boardSize - 1 && checkY === exitY) {
        return false;
      }

      if (grid[checkY][checkX] !== null) {
        return false;
      }
    }

    return true;
  }

  /**
   * 移動を適用し、新しい状態を発行する。合法手でない場合は現状態を維持。
   */
  applyMove(move: Move, state: GameState = this.state): GameState {
    if (!this.isMoveLegal(move, state)) {
      return state;
    }

    const cars = state.cars.map(car => {
      if (car.id !== move.carId) {
        return car;
      }
      const dx = move.direction === 'left' ? -move.steps : move.direction === 'right' ? move.steps : 0;
      const dy = move.direction === 'up' ? -move.steps : move.direction === 'down' ? move.steps : 0;
      return { ...car, x: car.x + dx, y: car.y + dy };
    });

    const newState: GameState = {
      ...state,
      cars,
      moveCount: state.moveCount + 1,
      history: [...state.history, move]
    };
    newState.isCleared = this.isCleared(newState);

    this._state.next(newState);
    return newState;
  }

  /**
   * 最後の手を取り消し、状態を巻き戻す。
   */
  undo(state: GameState = this.state): GameState {
    if (state.history.length === 0) {
      return state;
    }
    const last = state.history[state.history.length - 1];
    const inverse: Move = {
      carId: last.carId,
      direction: this.inverseDirection(last.direction),
      steps: last.steps
    };
    const history = state.history.slice(0, -1);
    const cars = state.cars.map(car => {
      if (car.id !== inverse.carId) {
        return car;
      }
      const dx = inverse.direction === 'left' ? -inverse.steps : inverse.direction === 'right' ? inverse.steps : 0;
      const dy = inverse.direction === 'up' ? -inverse.steps : inverse.direction === 'down' ? inverse.steps : 0;
      return { ...car, x: car.x + dx, y: car.y + dy };
    });

    const newState: GameState = {
      ...state,
      cars,
      moveCount: Math.max(0, state.moveCount - 1),
      history
    };
    newState.isCleared = this.isCleared(newState);
    this._state.next(newState);
    return newState;
  }

  /**
   * 勝利条件判定。
   */
  isCleared(state: GameState = this.state): boolean {
    const main = this.getMainCar(state);
    return main != null && main.x + main.length - 1 === state.boardSize - 1;
  }

  private getMainCar(state: GameState): Car | undefined {
    return state.cars.find(c => c.isMain);
  }

  private inverseDirection(dir: Move['direction']): Move['direction'] {
    switch (dir) {
      case 'left':
        return 'right';
      case 'right':
        return 'left';
      case 'up':
        return 'down';
      case 'down':
        return 'up';
    }
  }
}

