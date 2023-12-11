import { CommonModule } from '@angular/common';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { SearchComponent } from './search.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchComponent ],
      imports: [
        CommonModule,
        MatInputModule,
        FormsModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatButtonModule,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]   
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onButtonClick when clicked', fakeAsync(() => {
    spyOn(component, 'SearchFlight');
  
    let button = fixture.debugElement.nativeElement.querySelector('#buscar-button');
    
    button.click();
    console.log("buttonbutton",button.click());
  
    tick();
  
    expect(component.SearchFlight).toHaveBeenCalled();
  }));

  it('raises the selected event when clicked 1', () => {
    const comp = component
    comp.SearchFlight();
    comp.GetJourney();
  });

  it('raises the selected event when clicked 2', () => {
    component.form = new FormGroup({
      origen: new FormControl('MZL', Validators.required),
      destino: new FormControl('BCN', Validators.required),
      moneda: new FormControl('USD', Validators.required),
    });
    component.SearchFlight();

    component.form = new FormGroup({
      origen: new FormControl('MZL', Validators.required),
      destino: new FormControl('MZL', Validators.required),
      moneda: new FormControl('USD', Validators.required),
    });
    component.SearchFlight();
  });
});
