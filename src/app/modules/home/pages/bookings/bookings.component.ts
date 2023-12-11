import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookingPersonsRequest } from 'src/app/core/models/bookingPersons/bookingPersonsRequest';
import { Bookings } from 'src/app/core/models/bookings/bookings';
import { DocumentTypes } from 'src/app/core/models/documentTypes/document-types';
import { EmailRequest } from 'src/app/core/models/EmailRequest';
import { EmergencyContacts } from 'src/app/core/models/emergencyContacts/EmergencyContacts';
import { Genders } from 'src/app/core/models/genders/genders';
import { PaymentMethods } from 'src/app/core/models/paymentMethods/paymentMethods';
import { Persons } from 'src/app/core/models/persons/persons';
import { AccountService } from 'src/app/shared/services/account.service';
import { GenericService } from 'src/app/shared/services/generic.service';
import { LoadingService } from 'src/app/shared/services/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss']
})
export class BookingsComponent implements OnInit {
  public firstForm: FormGroup;
  public secondForm: FormGroup;
  public thirdForm: FormGroup;
  public fourthForm: FormGroup;
  public id: number = this.rutaActiva.snapshot.params['room'];
  public metodosPago: PaymentMethods[];
  public fechaIni: any;
  public fechaFin: any;
  public documentTypes: DocumentTypes[];
  public genders: Genders[];
  public countGuest: number = 0;
  constructor(private genericService: GenericService, public formBuilder: FormBuilder, public rutaActiva: ActivatedRoute,
    private datePipe: DatePipe, public router: Router, private accountService: AccountService, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.fechaIni = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd');
    this.fechaFin = this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd');
    var dias = (new Date(this.fechaFin).getTime() - new Date(this.fechaIni).getTime()) / 1000 / 60 / 60 / 24;
    this.firstForm = this.formBuilder.group({
      travel: this.rutaActiva.snapshot.params['travel'],
      origin: this.rutaActiva.snapshot.params['origin'],
      destination: this.rutaActiva.snapshot.params['destination'],
      fechaInicio: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaIni'], 'yyyy-MM-dd'), Validators.required],
      fechaFin: [this.datePipe.transform(this.rutaActiva.snapshot.params['fechaFin'], 'yyyy-MM-dd'), Validators.required],
      currency: this.rutaActiva.snapshot.params['currency'],
      precio: localStorage.getItem("price") == null ? 0 : localStorage.getItem("price")
    });
    this.secondForm = this.formBuilder.group({
      id: 0,
      usuario: 0,
      apellidos: ['', Validators.required],
      nombres: ['', Validators.required],
      fechaNacimiento: ['', Validators.required],
      genero: [0, Validators.required],
      tipoDocumento: [0, Validators.required],
      numeroDocumento: ['', Validators.required],
      email: '',
      telefonoContacto: 0,
    });
    this.thirdForm = this.formBuilder.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      numeroContacto: ['', Validators.required],
      email: '',
    });
    this.fourthForm = this.formBuilder.group({
      metodoPago: ['', Validators.required],
    });
    this.LoadData();
  }

  LoadData() {
    this.genericService.GetAll('DocumentTypes').subscribe(dataDocumentTypes => {
      this.genericService.GetAll('Genders').subscribe(dataGenders => {
        this.genericService.GetAll('PaymentMethods').subscribe(dataPaymentMethods => {
          this.documentTypes = dataDocumentTypes.data;
          this.genders = dataGenders.data;
          this.metodosPago = dataPaymentMethods.data;
          setTimeout(() => this.loadingService.ChangeStatusLoading(false), 300);
        });
      });
    });
  }
  Cancel() {
    this.router.navigate(['search-flights']);
  }
  SaveGuest() {
    if (this.countGuest < 1) {
      localStorage.setItem("Guest" + this.countGuest, JSON.stringify(this.secondForm.value));
      this.countGuest++;
      this.secondForm.reset();
    }
  }
  CreateReservation() {
    this.loadingService.ChangeStatusLoading(true);
    // Insert emergency contact
    var contact: EmergencyContacts | any = {
      id: 0,
      nombres: this.thirdForm.value.nombres,
      apellidos: this.thirdForm.value.apellidos,
      numeroContacto: this.thirdForm.value.numeroContacto,
      email: this.thirdForm.value.email,
    };
    this.genericService.Post('EmergencyContacts', contact).subscribe(resultContact => {
      // Insert bookings
      var booking: Bookings | any = {
        id: 1,
        usuario: this.accountService.userData.id,
        estado: 1,
        fechaInicio: this.fechaIni,
        fechaFin: this.fechaFin,
        contactoEmergencia: resultContact.data,
        tipoViaje: this.firstForm.value.travel,
        origen: this.firstForm.value.origin,
        destino: this.firstForm.value.destination,
        numeroPersonas: 1,
        precio: parseInt(this.firstForm.value.precio, 10),
      };
      this.genericService.Post('Bookings', booking).subscribe(resultBooking => {
        // Send email
        var emailRequest: EmailRequest | any = {
          email: this.accountService.userData.email,
          tipo: '1',
          origen: 'Reservas',
          idReserva: resultBooking.data,
          nombreCompleto: this.accountService.userData.nombres + ' ' + this.accountService.userData.apellidos
        };
        // Insert guests
        for (let i = 0; i < this.countGuest; i++) {
          var person: Persons = JSON.parse(localStorage['Guest' + i]);
          person.id = person.id == null ? 0 : person.id;
          person.email = person.email == null ? '' : person.email;
          person.telefonoContacto = person.telefonoContacto == null ? 0 : person.telefonoContacto;
          person.usuario = person.usuario == null ? 0 : person.usuario;
          this.genericService.Post('Persons', person).subscribe(personData => {
            // Insert guest to reservation
            var bookingPerson: BookingPersonsRequest = {
              id: 0,
              reserva: resultBooking.data,
              persona: personData.data
            };
            this.genericService.Post('BookingPersons', bookingPerson).subscribe(bookingPersonData => {
              console.log(bookingPersonData.succeeded);
            });
          });
        }
        setTimeout(() => this.loadingService.ChangeStatusLoading(false), 400);
        Swal.fire({
          icon: 'success',
          title: 'Se ha registrado la reserva exitosamente.',
          showConfirmButton: false,
          timer: 1300
        }).then(() => this.router.navigate(['reservation/form/' + resultBooking.data + '/view']));
      });
    });
  }
}
