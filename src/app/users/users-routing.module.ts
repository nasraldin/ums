import { RouterModule, Routes } from '@angular/router';

import { AddEditComponent } from './add/add-edit.component';
import { DetailsComponent } from './details/details.component';
import { LayoutComponent } from './layout.component';
import { ListComponent } from './list/list.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', component: ListComponent },
      { path: 'add', component: AddEditComponent },
      { path: 'edit/:id', component: AddEditComponent },
      { path: 'details/:id', component: DetailsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
