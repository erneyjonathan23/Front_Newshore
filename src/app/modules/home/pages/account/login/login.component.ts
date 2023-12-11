import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/shared/services/account.service';
import { LoadingService } from 'src/app/shared/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public form: FormGroup;
  hide = true;
  constructor(public formBuilder: FormBuilder, public accountService: AccountService, private snackBar: MatSnackBar, private loadingService: LoadingService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      UserName: ['', Validators.required],
      Password: ['', Validators.required]
    });
    this.accountService.ValidateSesion();
    setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
  }
  GetInto() {
    this.loadingService.ChangeStatusLoading(true);
    this.accountService.Authenticate(this.form.value).subscribe((result: any) => {
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
    }, error => {
      console.error(error);
      this.openSnackBar(error.error.Message);
      setTimeout(() => this.loadingService.ChangeStatusLoading(false), 800);
    });
  }
  openSnackBar(message: string) {
    this.snackBar.open(message, 'x', {
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
    });
  }
}