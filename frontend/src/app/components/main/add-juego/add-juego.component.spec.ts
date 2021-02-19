import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJuegoComponent } from './add-juego.component';

describe('AddJuegoComponent', () => {
  let component: AddJuegoComponent;
  let fixture: ComponentFixture<AddJuegoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddJuegoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJuegoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
