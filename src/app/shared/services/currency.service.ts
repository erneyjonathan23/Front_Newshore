import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { skipApiKey } from 'src/app/core/interceptors/skip-api-key';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  constructor(private http: HttpClient) { }

  public GetAllCurrency(): Observable<any[]> {
    return this.http.get<any[]>(environment.divisa, { headers: { skip: "true" } });
  }
}