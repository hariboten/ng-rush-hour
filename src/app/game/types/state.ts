import { Action } from './action';
import { Frame } from './frame';
import { Puzzle } from './puzzle';

export interface State {
  /** パズルの設定。 */
  puzzle: Puzzle;
  /** 全てのフレーム。 */
  frames: Frame[];
  /** これまでの操作履歴。 */
  history: Action[];
}
