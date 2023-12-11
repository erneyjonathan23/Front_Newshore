import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SearchResultComponent } from './search-result.component';

const routes: Routes = [
  { path: 'selection/:travel/:origin/:destination/:fechaIni/:fechaFin/:currency', component: SearchResultComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SearchResultRoutingModule { }
