import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementComponent } from './user-management.component';
import { UserAddComponent } from './user-add/user-add.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserManagementComponent, UserAddComponent],
  imports: [CommonModule, UserManagementRoutingModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule]
})
export class UserManagementModule {}
