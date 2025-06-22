import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../game.service';
import { GameState, Move } from '../models';
import { CarComponent } from '../car/car';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [CommonModule, CarComponent],
  templateUrl: './board.html',
  styleUrls: ['./board.scss']
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
