import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/security/auth.guard';
import { BookingsComponent } from './bookings.component';

const routes: Routes = [
  { 
    path: 'selection/:travel/:origin/:destination/:fechaIni/:fechaFin/:currency', 
    component: BookingsComponent,
    canActivate: [AuthGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingsRoutingModule { }
