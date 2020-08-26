import { AccountRoutingModule } from './account-routing.module';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountRoutingModule,
    MaterialModule,
  ],
  declarations: [LayoutComponent, LoginComponent],
})
export class AccountModule {}
