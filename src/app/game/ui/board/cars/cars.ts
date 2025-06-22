import { Component, input } from '@angular/core';
import { Car } from '../../../types/car';
import { Action } from '../../../types/action';

@Component({
  selector: 'app-cars',
  imports: [],
  templateUrl: './cars.html',
  styleUrl: './cars.scss',
})
export class Cars {
  cars = input.required<Car[]>();
  legalMoves = input.required<Action[]>();
}
