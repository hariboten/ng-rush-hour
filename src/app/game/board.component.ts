import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from './game.service';
import { Car, GameState, Move } from './models';
import { CarComponent } from './car.component';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CarComponent],
  template: `
    <div class="board" [style.--size.px]="cellSize">
      <div class="row" *ngFor="let y of sizeArray">
        <div class="cell" *ngFor="let x of sizeArray"></div>
      </div>
      <app-car
        *ngFor="let car of (state$ | async)?.cars"
        [car]="car"
        (move)="onMove($event)"
      ></app-car>
    </div>
  `,
  styles: [
    `
    .board {
      position: relative;
      display: inline-block;
      border: 2px solid #444;
    }
    .row {
      display: flex;
    }
    .cell {
      width: var(--size);
      height: var(--size);
      box-sizing: border-box;
      border: 1px solid #ccc;
    }
  `]
})
export class BoardComponent {
  readonly state$: Observable<GameState>;
  readonly cellSize = 64;

  constructor(private game: GameService) {
    this.state$ = this.game.state$;
  }

  get sizeArray(): number[] {
    const n = this.game.boardSize;
    return Array.from({ length: n }, (_, i) => i);
  }

  onMove(move: Move): void {
    this.game.move(move);
  }
}
