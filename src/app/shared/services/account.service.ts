import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, BehaviorSubject } from 'rxjs';
import { AuthenticationRequest } from 'src/app/core/models/users/authentication-request';
import { AuthenticationResponse, Response } from 'src/app/core/models/response';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { RegisterRequest } from 'src/app/core/models/users/register-request';
import { MenuProperties } from 'src/app/core/models/menu-properties';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userSubject: BehaviorSubject<AuthenticationResponse | any>;
  public get userData(): AuthenticationResponse {
    return this.userSubject.value;
  }

  constructor(private http: HttpClient, public router: Router) {
    var session = sessionStorage['user'] == undefined ? null : JSON.parse(sessionStorage['user']);
    this.userSubject = new BehaviorSubject<AuthenticationResponse>(session);
  }

  public Authenticate(data: AuthenticationRequest): Observable<Response> {
    return this.http.post<Response>(environment.urlApi + "Account/Authenticate", data).pipe(
      map(res => {
        if (res.succeeded == true) {
          const user: AuthenticationResponse = res.data;
          this.CreateUserSession(user);
        }
        return res;
      })
    );
  }

  public Register(data: RegisterRequest): Observable<Response> {
    return this.http.post<Response>(environment.urlApi + "Account/Register", data).pipe(
      map(res => {
        if (res.succeeded == true) {
          console.log(data);
          var authRequest: AuthenticationRequest | any = {
            userName: data.usuario, password: data.contrasena
          };
          this.Authenticate(authRequest).subscribe();
        }
        return res;
      })
    );
  }

  public CreateUserSession(auth: AuthenticationResponse) {
    sessionStorage.setItem('user', JSON.stringify(auth));
    this.userSubject.next(auth);
    Swal.fire({
      icon: 'success',
      title: 'Se ha iniciado sesión correctamente.',
      showConfirmButton: false,
      timer: 1300
    }).then(() => this.ValidateSesion());
  }

  public CloseUserSession() {
    sessionStorage.removeItem('user');
    this.userSubject.next(null);
    this.ValidateSesion();
    window.location.reload();
  }
  public ValidateSesion() {
    if (this.userData) {
      if (this.userData.isVerified) {
        this.router.navigate(['/']);
      }
    }
  }
}