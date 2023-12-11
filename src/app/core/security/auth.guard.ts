import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, Routes } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AccountService } from 'src/app/shared/services/account.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private accountService: AccountService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.accountService.userData) {
            return true;
        }
        this.router.navigate(['account/login']);
        return true;
    }
}