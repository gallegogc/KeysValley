import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JuegoSinStockComponent } from './juego-sin-stock.component';

describe('JuegoSinStockComponent', () => {
  let component: JuegoSinStockComponent;
  let fixture: ComponentFixture<JuegoSinStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JuegoSinStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegoSinStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
