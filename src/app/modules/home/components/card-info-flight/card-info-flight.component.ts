import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-card-info-flight',
  templateUrl: './card-info-flight.component.html',
  styleUrls: ['./card-info-flight.component.scss']
})
export class CardInfoFlightComponent implements OnInit {
  @Input("flightCarrier") flightCarrier: string;
  @Input("flightNumber") flightNumber: any;
  @Input("origin") origin: string;
  @Input("destination") destination: string;
  @Input("date") date: string;
  @Input("currency") currency: string;
  @Input("price") price: number = 1;
  @Input("type") type: number = 1;

  constructor() {
  }

  ngOnInit(): void {
  }
}
