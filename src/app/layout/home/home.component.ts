import { AccountService, UserService } from '../../services';

import { Component } from '@angular/core';

@Component({ templateUrl: 'home.component.html' })
export class HomeComponent {
  user: any;

  constructor(
    private accountService: AccountService,
    private userService: UserService,
  ) {
    this.setUserInfo();
  }

  setUserInfo() {
    const userId = JSON.parse(localStorage.getItem('sub'));

    this.userService.get(userId).subscribe((user) => {
      const userInfo = {
        firstName: user.firstName,
        email: user.email,
        username: user.username,
        role: user.role,
        id: user.id,
      };

      this.user = userInfo;

      localStorage.setItem('user', JSON.stringify(userInfo));
      this.accountService.setUserInfo = userInfo;
    });
  }
}
