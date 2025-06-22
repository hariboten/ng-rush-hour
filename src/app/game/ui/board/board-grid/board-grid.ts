import { Component, input } from '@angular/core';
import { Point } from '../../../types/point';

/**
 * ボードのグリッドを表示するコンポーネント
 */
@Component({
  selector: 'app-board-grid',
  imports: [],
  templateUrl: './board-grid.html',
  styleUrl: './board-grid.scss',
})
export class BoardGrid {
  boardWidth = input.required<number>();
  boardHeight = input.required<number>();
  exit = input.required<Point>();
  exitWidth = input.required<number>();
  exitHeight = input.required<number>();
}
