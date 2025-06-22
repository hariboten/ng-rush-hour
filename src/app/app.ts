import { Component } from '@angular/core';
import { BoardComponent } from './game/board/board';

@Component({
  selector: 'app-root',
  imports: [BoardComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ng-rush-hour';
}
