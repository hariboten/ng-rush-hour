import { Action } from '../types/action';
import { State } from '../types/state';

export function isLegal(state: State, action: Action): boolean {
  throw new Error('not implemented');
}

export function apply(state: State, action: Action): State {
  throw new Error('not implemented');
}
