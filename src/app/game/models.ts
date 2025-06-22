export interface Move {
  carId: string;
  direction: 'left' | 'right' | 'up' | 'down';
  steps: number;
}

export interface Car {
  id: string;
  isMain: boolean;
  orientation: 'horizontal' | 'vertical';
  length: 2 | 3;
  x: number;
  y: number;
}

export interface GameState {
  boardSize: number;
  cars: Car[];
  moveCount: number;
  isCleared: boolean;
  history: Move[];
}
