import { Car } from './car';

/**
 * ある時点のゲーム盤面全体の状態。
 */
export interface Frame {
  /** 盤面の一辺の長さ。6 なら 6x6 グリッド。 */
  boardSize: number;
  /** 盤面上に配置されている全ての車。 */
  cars: Car[];
  /** 現在までに行った手数。 */
  moveCount: number;
  /** パズルを解いたかどうか。 */
  isSolved: boolean;
}
