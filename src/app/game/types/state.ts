import { Action } from './action';
import { Frame } from './frame';
import { Level } from './level';

export interface State {
  /** レベルの設定。 */
  level: Level;
  /** 全てのフレーム。 */
  frames: Frame[];
  /** これまでの操作履歴。 */
  history: Action[];
}
