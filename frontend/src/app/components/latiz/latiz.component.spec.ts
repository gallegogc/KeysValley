import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatizComponent } from './latiz.component';

describe('LatizComponent', () => {
  let component: LatizComponent;
  let fixture: ComponentFixture<LatizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LatizComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LatizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
