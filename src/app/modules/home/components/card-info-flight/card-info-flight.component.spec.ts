import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardInfoFlightComponent } from './card-info-flight.component';

describe('CardInfoFlightComponent', () => {
  let component: CardInfoFlightComponent;
  let fixture: ComponentFixture<CardInfoFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardInfoFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardInfoFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
