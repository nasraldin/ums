import { AccountService } from '../../services/account.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(public accountService: AccountService) {}

  logout() {
    this.accountService.logout();
  }
}
