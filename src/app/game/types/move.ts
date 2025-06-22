import { Direction } from './direction';

/**
 * ゲームの履歴上の 1 手を表す。
 */
export interface Move {
  /** 動かす車の ID。 */
  carId: string;
  /** 移動方向。 */
  direction: Direction;
  /** 移動するセル数（1 以上）。 */
  steps: number;
}
