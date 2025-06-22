import { State } from '../game/types/state';
import { Move } from '../game/types/move';
import { Level } from '../game/types/level';

/**
 * レベル定義から初期状態を生成します。
 */
export function createInitialState(level: Level): State {
  throw new Error('not implemented');
}

/**
 * 指定した手が現在の状態で合法か判定します。
 */
export function isMoveLegal(state: State, move: Move): boolean {
  throw new Error('not implemented');
}

/**
 * 手を適用して新しい状態を返します。
 */
export function applyMove(state: State, move: Move): State {
  throw new Error('not implemented');
}

/**
 * ゲームがクリア状態かどうかを返します。
 */
export function isCleared(state: State): boolean {
  throw new Error('not implemented');
}

/**
 * 現在の状態から可能な全ての手を列挙します。
 */
export function listLegalMoves(state: State): Move[] {
  throw new Error('not implemented');
}
