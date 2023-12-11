import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { RoutesComponent } from './pages/configuratin/routes/routes.component';
import { RoutesFormComponent } from './pages/configuratin/routes-form/routes-form.component';
import { CardInfoFlightComponent } from './components/card-info-flight/card-info-flight.component';

@NgModule({
  declarations: [
  
    RoutesComponent,
       RoutesFormComponent,
       CardInfoFlightComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
  ]
})
export class HomeModule { }
