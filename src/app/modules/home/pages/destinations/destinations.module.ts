import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { HttpClientModule } from '@angular/common/http';
import { CardModule } from 'src/app/shared/components/card/card.module';
import { GenericTableModule } from 'src/app/shared/components/generic-table/generic-table.module';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DestinationsComponent } from './destinations.component';
import { DestinationsRoutingModule } from './destinations-routing.module';

@NgModule({
  declarations: [
    DestinationsComponent
  ],
  imports: [
    CommonModule,
    DestinationsRoutingModule,
    MatCardModule,
    HttpClientModule,
    CardModule,
    GenericTableModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule
  ]
})
export class DestinationsModule { }
