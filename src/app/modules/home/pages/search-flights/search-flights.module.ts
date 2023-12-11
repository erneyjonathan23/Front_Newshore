import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFlightsRoutingModule } from './search-flights-routing.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SearchFlightsComponent } from './search-flights.component';
import { HeaderComponent } from '../../components/header/header.component';
import { SearchComponent } from '../../components/search/search.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { CardModule } from 'src/app/shared/components/card/card.module';

@NgModule({
  declarations: [
    HeaderComponent,
    SearchFlightsComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    SearchFlightsRoutingModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatRadioModule,
    CardModule
  ]
})
export class SearchFlightsModule { }
