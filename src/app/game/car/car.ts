import { Component, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Car, Move } from '../models';

@Component({
  selector: 'app-car',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './car.html',
  styleUrl: './car.scss'
})
export class CarComponent {
  @Input() car!: Car;
  @Output() move = new EventEmitter<Move>();

  @HostBinding('style.width.px') get w() {
    return this.car.orientation === 'horizontal' ? this.car.length * 64 : 64;
  }
  @HostBinding('style.height.px') get h() {
    return this.car.orientation === 'vertical' ? this.car.length * 64 : 64;
  }
  @HostBinding('style.transform') get pos() {
    return `translate(${this.car.x * 64}px, ${this.car.y * 64}px)`;
  }
  @HostBinding('style.background') get color() {
    return this.car.isMain ? '#f44' : '#66f';
  }

  moveOne(dir: 'left'|'right'|'up'|'down'): void {
    this.move.emit({ carId: this.car.id, direction: dir, steps: 1 });
  }
}
