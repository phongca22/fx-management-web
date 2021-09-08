import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { UserCreateModule } from '../user-create/user-create.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';
import { UserFilterComponent } from './user-filter/user-filter.component';

@NgModule({
  declarations: [UserListComponent, UserFilterComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    UserInfoModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    UserCreateModule
  ]
})
export class UserListModule {}
