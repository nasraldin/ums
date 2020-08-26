import { Component } from '@angular/core';
import { NgxNLoggerService } from 'ngx-n-logger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'User Management System';

  constructor(private logger: NgxNLoggerService) {
    this.logger.header('User Management System is Started!');
  }
}
