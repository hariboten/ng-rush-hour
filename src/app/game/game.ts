import { Injectable } from '@angular/core';
import { State } from './types/state';
import { Action } from './types/action';

@Injectable({
  providedIn: 'root',
})
export class Game {
  /**
   * ゲームの状態を初期化します。
   */
  public init(): void {
    // ゲームの初期化処理をここに記述
  }

  public state(): State {
    throw new Error('not implemented');
  }

  public actions(): Action[] {
    throw new Error('not implemented');
  }

  public next(action: Action): void {
    throw new Error('not implemented');
  }
}
