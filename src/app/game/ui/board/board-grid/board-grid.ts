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

  /** 行の配列を生成します。 */
  get rows(): number[] {
    return Array.from({ length: this.boardHeight() }, (_, i) => i);
  }

  /** 列の配列を生成します。 */
  get cols(): number[] {
    return Array.from({ length: this.boardWidth() }, (_, i) => i);
  }

  /** 指定のセルが出口に含まれるかどうかを返します。 */
  isExitCell(x: number, y: number): boolean {
    const exit = this.exit();
    const width = this.exitWidth();
    const height = this.exitHeight();
    return (
      x >= exit.x && x < exit.x + width && y >= exit.y && y < exit.y + height
    );
  }
}
