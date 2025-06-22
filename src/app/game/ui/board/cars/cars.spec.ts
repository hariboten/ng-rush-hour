import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cars } from './cars';
import { provideZonelessChangeDetection } from '@angular/core';

describe('Cars', () => {
  let component: Cars;
  let fixture: ComponentFixture<Cars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cars],
      providers: [provideZonelessChangeDetection()],
    }).compileComponents();

    fixture = TestBed.createComponent(Cars);
    component = fixture.componentInstance;
    fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
