import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list.component';

@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    UserListRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    UserInfoModule,
    MatPaginatorModule
  ]
})
export class UserListModule {}
