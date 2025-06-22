import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardGrid } from './board-grid';

describe('BoardGrid', () => {
  let component: BoardGrid;
  let fixture: ComponentFixture<BoardGrid>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardGrid]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardGrid);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
