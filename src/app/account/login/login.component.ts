import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AccountService } from '../../services';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private accountService: AccountService,
    private snackBar: MatSnackBar,
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
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

    this.accountService
      .login(this.formFields.email.value, this.formFields.password.value)
      .subscribe(
        () => {
          this.snackBar.open('User successfully login', 'Close', {
            duration: 1600,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.router.navigate([this.returnUrl]);
        },
        (error) => {
          this.snackBar.open(error.error, 'Close', {
            duration: 1600,
            horizontalPosition: 'left',
            verticalPosition: 'bottom',
          });
          this.loading = false;
        },
      );
  }
}
