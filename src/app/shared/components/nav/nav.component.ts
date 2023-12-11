import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuProperties } from 'src/app/core/models/menu-properties';
import { AccountService } from '../../services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public enableSesion: boolean = false;
  constructor(public accountService: AccountService) {
  }
  ngOnInit(): void {

  }
  CloseSesion() {
    this.accountService.CloseUserSession();
  }
  
}
