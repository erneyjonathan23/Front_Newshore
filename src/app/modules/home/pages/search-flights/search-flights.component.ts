import { Component, OnInit } from '@angular/core';
import { Flights, Response } from 'src/app/core/models/response';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-search-flights',
  templateUrl: './search-flights.component.html',
  styleUrls: ['./search-flights.component.scss']
})
export class SearchFlightsComponent implements OnInit {
  public flights: Flights[];
  constructor(private loadingService: LoadingService, private genericService: GenericService) { }

  ngOnInit(): void {
    this.LoadData();
  }

  LoadData(){
    this.genericService.GetAll('Flight/AllTravelRoute?PageNumber=1&PageSize=3').subscribe((response: Response) => {
      this.flights = response.data;
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
    });
  }

  SearchFlights() {
  }
}