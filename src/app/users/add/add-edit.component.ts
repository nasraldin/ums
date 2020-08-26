import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { NgxNLoggerService } from 'ngx-n-logger';
import { User } from '../../models';
import { UserService } from '../../services';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  form: FormGroup;
  user: User;
  id: number;
  isAddMode: boolean;
  loading = false;
  submitted = false;
  hide = true;
  isAdmin: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private logger: NgxNLoggerService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.isAddMode = !this.id;

    const passwordValidators = [Validators.minLength(6)];
    if (this.isAddMode) {
      passwordValidators.push(Validators.required);
    }

    this.form = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', passwordValidators],
      role: [''],
      city: [''],
    });

    if (!this.isAddMode) {
      this.userService.get(this.id).subscribe((user) => {
        this.logger.info('Edit User', user);
        this.user = user;

        this.formFields.firstName.setValue(user.firstName);
        this.formFields.lastName.setValue(user.lastName);
        this.formFields.email.setValue(user.email);
        this.formFields.username.setValue(user.username);
        this.formFields.city.setValue(user.city);
        this.formFields.role.setValue(user.role);
      });
    }

    const user = JSON.parse(localStorage.getItem('user'));

    if (user.role === 'admin') {
      this.isAdmin = true;
    }
  }

  get formFields() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
      this.createUser();
    } else {
      this.updateUser();
    }
  }

  private createUser() {
    this.userService.save(this.form.value).subscribe(
      (user) => {
        this.logger.info('Add New User', user);

        this.snackBar.open('Successfully added user!', 'Close', {
          duration: 1600,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/users']);
      },
      (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 1600,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        this.loading = false;
      },
    );
  }

  private updateUser() {
    // this workaround to fix json-server update password/set defualt for demo only
    if (!this.form.value.password) {
      // this.formFields.password.setValue(this.user.password);
      this.formFields.password.setValue('Passw0rd');
    }

    this.userService.update(this.id, this.form.value).subscribe(
      (user) => {
        this.logger.info('Update User', user);

        this.snackBar.open('Successfully updated user!', 'Close', {
          duration: 1600,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });

        this.router.navigate(['/users']);
      },
      (error) => {
        this.snackBar.open(error, 'Close', {
          duration: 1600,
          horizontalPosition: 'left',
          verticalPosition: 'bottom',
        });
        this.loading = false;
      },
    );
  }
}
