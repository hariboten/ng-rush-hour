import { Point } from './point';

/**
 * 盤面に配置される 1 台の車を表す。
 *
 * 配置時に満たすべき不変条件:
 * - 車体は盤面からはみ出さないこと
 * - 他の車と重ならないこと
 */
export interface Car {
  /** 車を識別するための ID。 */
  id: string;
  /** 赤い車であれば true。 */
  isMain: boolean;
  /** 車の幅（セル数。通常 2 または 3）。 */
  width: number;
  /** 車の高さ（セル数。通常 1 または 2）。 */
  height: number;
  /** 車の左上端セルの座標。 */
  pos: Point;
}
