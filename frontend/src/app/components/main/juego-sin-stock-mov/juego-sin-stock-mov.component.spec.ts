import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoSinStockMovComponent } from './juego-sin-stock-mov.component';

describe('JuegoSinStockMovComponent', () => {
  let component: JuegoSinStockMovComponent;
  let fixture: ComponentFixture<JuegoSinStockMovComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoSinStockMovComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoSinStockMovComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
