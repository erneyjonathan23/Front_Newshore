import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  providers: [DatePipe]
})
export class SearchComponent implements OnInit {
  public form: FormGroup;
  public ciudades: any[];
  public minDate: any = new Date();
  constructor(public formBuilder: FormBuilder, public genericService: GenericService, public router: Router, private datePipe: DatePipe, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      travel: "1",
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: '',
      currency: ['USD']
    });
  }
  Search() {
    var fechaInicio = this.datePipe.transform(this.form.controls['fechaInicio'].value, 'yyyy-MM-dd');
    var fechaFin = this.datePipe.transform(this.form.value.travel != 2 ? this.form.value.fechaFin : new Date(), 'yyyy-MM-dd');
    this.router.navigate(['/search-result/selection/' + this.form.value.travel + '/' + this.form.value.origin.toUpperCase() + '/'
      + this.form.value.destination.toUpperCase() + '/' + fechaInicio + '/' + fechaFin + '/' + this.form.value.currency]);
  }
}
