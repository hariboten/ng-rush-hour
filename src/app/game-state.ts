// ラッシュアワーのゲーム状態を表すデータモデル。

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
  /** 左上端セルの X 座標。 */
  x: number;
  /** 左上端セルの Y 座標。 */
  y: number;
}

/**
 * 車の移動方向を表す列挙型。
 */
export enum Direction {
  /** 左方向。 */
  Left = 'left',
  /** 右方向。 */
  Right = 'right',
  /** 上方向。 */
  Up = 'up',
  /** 下方向。 */
  Down = 'down',
}

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

/**
 * ある時点のゲーム盤面全体の状態。
 */
export interface GameState {
  /** 盤面の一辺の長さ。6 なら 6x6 グリッド。 */
  boardSize: number;
  /** 盤面上に配置されている全ての車。 */
  cars: Car[];
  /** 現在までに行った手数。 */
  moveCount: number;
  /** パズルを解いたかどうか。 */
  isCleared: boolean;
  /** UNDO 用の履歴スタック。 */
  history: Move[];
}

