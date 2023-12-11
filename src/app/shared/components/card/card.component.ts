import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  @Input("picture") picture: any = "https://www.kayak.com.co/rimg/himg/47/ec/7e/ice-115522-63352612_3XL-307131.jpg?width=1366&height=768&crop=true";
  @Input("title") title: string;
  @Input("location") location: string;
  @Input("number") number: string;
  @Input("price") price: any;
  @Input("info") info: any;
  @Input("stars") stars: number = 0;
  public estrellas: any[] = [0];
  async ngOnInit() {
    this.estrellas.length = this.stars;
  }
  constructor() {
  }
}
