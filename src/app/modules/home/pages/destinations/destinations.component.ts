import { Component, OnInit } from '@angular/core';
import { Destinations } from 'src/app/core/models/destinations/destinations';
import { Flights, Response } from 'src/app/core/models/response';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-destinations',
  templateUrl: './destinations.component.html',
  styleUrls: ['./destinations.component.scss']
})
export class DestinationsComponent implements OnInit {
  public flights: Flights[] = [];
  public pageSize: number = 8;
  public pageNumber: number = 0;
  public totalItems: number = 0;
  public data: Destinations[] = [];
  constructor(public genericService: GenericService, private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.LoadData();
  }
  ChangePage(event: any) {
    this.loadingService.ChangeStatusLoading(true);
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;
    this.LoadData();
  }
  LoadData() {
    this.genericService.GetAll('Flight/AllTravelRoute?PageNumber=' + (this.pageNumber + 1) + '&PageSize=' + this.pageSize).subscribe((response: Response) => {
      this.pageSize = response.pageSize;
      this.totalItems = response.totalItems;
      this.flights = response.data;
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
    });
  }
}