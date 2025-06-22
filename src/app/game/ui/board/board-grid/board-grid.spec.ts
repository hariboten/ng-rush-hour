import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGrid } from './board-grid';
import { provideZonelessChangeDetection } from '@angular/core';

describe('BoardGrid', () => {
  let component: BoardGrid;
  let fixture: ComponentFixture<BoardGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGrid],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardGrid);
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
