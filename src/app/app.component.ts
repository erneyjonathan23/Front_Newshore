import { Component } from '@angular/core';
import { LoadingService } from './shared/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public loading: Boolean = true;
  isCollapsed = false;

  constructor(private loadingService: LoadingService) {
  }
  ngOnInit(): void {
    this.loadingService.ChangeStatusLoading(true);
    this.loadingService.loadingPage.subscribe(result => this.loading = result);
  }
  title = 'Newshore Air';
}
