import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AccountService } from 'src/app/shared/services/account.service';


@Injectable({ providedIn: 'root' })
export class ServiceInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const auth = this.accountService.userData;
    if (!request.headers.get("skip")) {
      if (auth) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${auth.jwToken}`
          }
        });
      }
    }
    const skipIntercept = request.headers.has('skip');
    if (skipIntercept) {
      request = request.clone({
        headers: request.headers.delete('skip')
      });
    }
    return next.handle(request);
    // return next.handle(request).pipe(
    //   catchError((requestError) => {
    //     if (requestError.status !== 401) {
    //       const { error } = requestError;
    //       console.log({
    //         severity: 'error',
    //         summary: `HTTP Error - ${requestError.status}`,
    //         detail: error && error.message,
    //       });
    //     }
    //     return throwError(() => new Error(requestError));
    //   })
    // );
  }
}

