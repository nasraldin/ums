import { Component, OnInit } from '@angular/core';

import { ConfirmDialogComponent } from '../../shared/components';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { NgxNLoggerService } from 'ngx-n-logger';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-user-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  users: User[] = [];
  displayedColumns: string[] = [
    'FirstName',
    'LastName',
    'Email',
    'Username',
    'Id',
  ];
  dataSource: any = [];
  isAdmin: boolean;
  curentUserId: number;

  constructor(
    private userService: UserService,
    public logger: NgxNLoggerService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.fetchUsers();
  }

  deleteUser(id: number) {
    const user = this.users.find((x) => x.id === id);

    const confirmDialog = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Confirm Remove User',
        message: 'Are you sure, you want to remove an user: ' + user.firstName,
      },
    });

    confirmDialog.afterClosed().subscribe((result) => {
      if (result === true) {
        this.userService.delete(id).subscribe(() => {
          this.fetchUsers();

          this.snackBar.open('Successfully deleted user!', 'Close', {
            duration: 1600,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });

          this.logger.info(`User ${id} Deleted`);
        });
      }
    });
  }

  fetchUsers() {
    this.userService.getAll().subscribe((users) => {
      const user = JSON.parse(localStorage.getItem('user'));
      this.curentUserId = user.id;

      if (user.role === 'admin') {
        this.isAdmin = true;
        this.users = users;
      } else {
        this.users = users.filter((x) => x.id === user.id);
      }

      this.dataSource = new MatTableDataSource<User>(this.users);
    });
  }
}
