import { ComponentFixture, TestBed } from '@angular/core/testing';

import { destinationsComponent } from './destinations.component';

describe('destinationsComponent', () => {
  let component: destinationsComponent;
  let fixture: ComponentFixture<destinationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ destinationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(destinationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
