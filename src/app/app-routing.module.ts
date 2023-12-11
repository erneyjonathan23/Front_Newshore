import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/security/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'search-flights',
    pathMatch: 'full',
  },
  {
    path: 'destinations',
    loadChildren: () => import('./modules/home/pages/destinations/destinations.module').then(m => m.DestinationsModule)
  },
  {
    path: 'search-flights',
    loadChildren: () => import('./modules/home/pages/search-flights/search-flights.module').then(m => m.SearchFlightsModule)
  },
  {
    path: 'account',
    loadChildren: () => import('./modules/home/pages/account/account.module').then(m => m.AccountModule)
  },
  {
    path: 'search-result',
    loadChildren: () => import('./modules/home/pages/search-result/search-result.module').then(m => m.SearchResultModule)
  },
  {
    path: 'bookings',
    loadChildren: () => import('./modules/home/pages/bookings/bookings.module').then(m => m.BookingsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'reservation',
    loadChildren: () => import('./modules/home/pages/reservation/reservation.module').then(m => m.ReservationModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
