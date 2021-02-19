import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoMovComponent } from './juego-mov.component';

describe('JuegoMovComponent', () => {
  let component: JuegoMovComponent;
  let fixture: ComponentFixture<JuegoMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoMovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
