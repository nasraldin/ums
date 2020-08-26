import { AddEditComponent } from './add/add-edit.component';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { MaterialModule } from '../material/material.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UsersRoutingModule,
    MaterialModule,
    SharedModule,
  ],
  declarations: [
    LayoutComponent,
    ListComponent,
    AddEditComponent,
    DetailsComponent,
  ],
})
export class UsersModule {}
