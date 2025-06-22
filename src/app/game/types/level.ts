import { Car } from './car';
import { Point } from './point';

export interface Level {
  /** 盤面の一辺の長さ。6 なら 6x6 グリッド。 */
  boardSize: number;

  /** 盤面上に配置されている全ての車の初期配置。 */
  initialPos: Car[];

  /** 出口の左上端セルの座標。 */
  exit: Point;
}
