import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Destinations } from 'src/app/core/models/destinations/destinations';
import { Flight } from 'src/app/core/models/flights/flight';
import { Journey } from 'src/app/core/models/flights/journey';
import { Response } from 'src/app/core/models/response';
import { AccountService } from 'src/app/shared/services/account.service';
import { CurrencyService } from 'src/app/shared/services/currency.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss']
})
export class SearchResultComponent implements OnInit {
  public form: FormGroup;
  public journey: Journey;
  public flights: Flight[];
  public data: Response;
  public currency: number = 1;
  constructor(public genericService: GenericService, public formBuilder: FormBuilder, public rutaActiva: ActivatedRoute, private datePipe: DatePipe,
    private router: Router, private loadingService: LoadingService, private accountService: AccountService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.form = this.formBuilder.group({
      travel: this.rutaActiva.snapshot.params['travel'],
      origin: this.rutaActiva.snapshot.params['origin'],
      destination: this.rutaActiva.snapshot.params['destination'],
      fechaInicio: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd'), Validators.required],
      fechaFin: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd'), Validators.required],
      currency: this.rutaActiva.snapshot.params['currency']
    });
    this.LoadData();
  }
  GetMoney() {
    this.currencyService.GetAllCurrency().subscribe((monedas: any) => {
      this.currency = monedas.rates[this.form.value.currency.toUpperCase()]
    },
      error => console.error
    );
  }
  LoadData() {
    this.GetMoney();
    var filter = "?Origin=" + this.form.value.origin + "&Destination=" + this.form.value.destination
      + "&Currency=" + this.form.value.currency;
    this.genericService.GetAll('Flight', filter).subscribe((dataFlight: Response) => {
      this.data = dataFlight;
      this.journey = dataFlight.data;
      this.flights = this.journey.flights;
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 500);
    });
  }
  GoBooking() {
    var fechaInicio = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd');
    var fechaFin = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd');
    if (this.accountService.userData) {
      localStorage.setItem("price", (this.journey.price * this.currency * (this.form.value.travel == 1 ? 2 : 1)).toString());
      this.router.navigate(['/bookings/selection/' + this.form.value.travel + '/' + this.form.value.origin.toUpperCase() + '/' + this.form.value.destination.toUpperCase() +
        '/' + fechaInicio + '/' + fechaFin + '/' + this.form.value.currency]);
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Debes ingresar',
        text: 'Para continuar con la reserva debes ingresar con tu cuenta. Ingresa con tu cuenta y vuelve a realizar la busqueda.',
        footer: '<a style="padding: 10px;" href="/account/login">Ingresar</a><a style="padding: 10px;" href="/account/register">Registrarse</a>'
      })
    }
  }
  ChangeCurrency() {
    this.loadingService.ChangeStatusLoading(true);
    var fechaInicio = this.datePipe.transform(this.form.controls['fechaInicio'].value, 'yyyy-MM-dd');
    var fechaFin = this.datePipe.transform(this.form.controls['fechaFin'].value, 'yyyy-MM-dd');
    this.router.navigate(['/search-result/selection/' + this.form.value.travel + '/' + this.form.value.origin.toUpperCase() + '/'
      + this.form.value.destination.toUpperCase() + '/' + fechaInicio + '/' + fechaFin + '/' + this.form.value.currency]);
    this.LoadData();
  }
}
