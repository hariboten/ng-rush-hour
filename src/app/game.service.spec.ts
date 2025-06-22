import { applyMove, GameState, Car, isMoveLegal, isCleared } from './game.service';

describe('GameService logic', () => {
  function createState(): GameState {
    const cars: Car[] = [
      { id: 'red', isMain: true, orientation: 'horizontal', length: 2, x: 1, y: 2 },
      { id: 'blocker', isMain: false, orientation: 'vertical', length: 3, x: 4, y: 0 }
    ];
    return { boardSize: 6, cars, moveCount: 0, isCleared: false, history: [] };
  }

  it('rejects moves that collide with another car', () => {
    const state = createState();
    const move = { carId: 'red', direction: 'right', steps: 3 } as const;
    expect(isMoveLegal(state, move)).toBeFalse();
  });

  it('rejects moves that go out of bounds', () => {
    const state = createState();
    const move = { carId: 'blocker', direction: 'up', steps: 1 } as const;
    expect(isMoveLegal(state, move)).toBeFalse();
  });

  it('detects victory when red car reaches the exit', () => {
    const state = createState();
    // remove blocking car so path is clear
    state.cars = state.cars.filter(c => c.id !== 'blocker');
    const move = { carId: 'red', direction: 'right', steps: 3 } as const;
    const newState = applyMove(state, move);
    expect(newState.isCleared).toBeTrue();
    expect(isCleared(newState)).toBeTrue();
  });
});
