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

export function getOccupiedGrid(state: GameState): (string | null)[][] {
  const grid: (string | null)[][] = [];
  for (let y = 0; y < state.boardSize; y++) {
    grid[y] = [];
    for (let x = 0; x < state.boardSize; x++) {
      grid[y][x] = null;
    }
  }
  for (const car of state.cars) {
    for (let i = 0; i < car.length; i++) {
      const x = car.orientation === 'horizontal' ? car.x + i : car.x;
      const y = car.orientation === 'vertical' ? car.y + i : car.y;
      grid[y][x] = car.id;
    }
  }
  return grid;
}

export function isMoveLegal(state: GameState, move: Move): boolean {
  const car = state.cars.find(c => c.id === move.carId);
  if (!car || move.steps < 1) {
    return false;
  }

  // orientation check
  if (
    (car.orientation === 'horizontal' && (move.direction === 'up' || move.direction === 'down')) ||
    (car.orientation === 'vertical' && (move.direction === 'left' || move.direction === 'right'))
  ) {
    return false;
  }

  const grid = getOccupiedGrid(state);
  const mainCar = state.cars.find(c => c.isMain);
  const exitX = state.boardSize - 1;
  const exitY = mainCar?.y ?? -1;

  for (let step = 1; step <= move.steps; step++) {
    let checkX = car.x;
    let checkY = car.y;

    if (car.orientation === 'horizontal') {
      if (move.direction === 'right') {
        checkX = car.x + car.length - 1 + step;
        checkY = car.y;
      } else {
        checkX = car.x - step;
        checkY = car.y;
      }
    } else {
      if (move.direction === 'down') {
        checkX = car.x;
        checkY = car.y + car.length - 1 + step;
      } else {
        checkX = car.x;
        checkY = car.y - step;
      }
    }

    if (
      checkX < 0 ||
      checkY < 0 ||
      checkX >= state.boardSize ||
      checkY >= state.boardSize
    ) {
      return false;
    }

    if (!car.isMain && checkX === exitX && checkY === exitY) {
      return false;
    }

    const occupant = grid[checkY][checkX];
    if (occupant && occupant !== car.id) {
      return false;
    }
  }

  return true;
}

export function applyMove(state: GameState, move: Move): GameState {
  if (!isMoveLegal(state, move)) {
    return state;
  }
  const cars = state.cars.map(c => {
    if (c.id !== move.carId) {
      return { ...c };
    }
    let { x, y } = c;
    switch (move.direction) {
      case 'left':
        x -= move.steps;
        break;
      case 'right':
        x += move.steps;
        break;
      case 'up':
        y -= move.steps;
        break;
      case 'down':
        y += move.steps;
        break;
    }
    return { ...c, x, y };
  });

  const newState: GameState = {
    boardSize: state.boardSize,
    cars,
    moveCount: state.moveCount + 1,
    isCleared: false,
    history: [...state.history, move]
  };

  newState.isCleared = isCleared(newState);
  return newState;
}

export function isCleared(state: GameState): boolean {
  const mainCar = state.cars.find(c => c.isMain);
  if (!mainCar) {
    return false;
  }
  const endX = mainCar.x + mainCar.length - 1;
  return endX === state.boardSize - 1;
}
