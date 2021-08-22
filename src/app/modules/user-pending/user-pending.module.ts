import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { SupportPickerModule } from '../support-picker/support-picker.module';
import { UserEditModule } from '../user-edit/user-edit.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserPendingRoutingModule } from './user-pending-routing.module';
import { UserPendingComponent } from './user-pending.component';

@NgModule({
  declarations: [UserPendingComponent],
  imports: [
    CommonModule,
    UserPendingRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    UserInfoModule,
    UserEditModule,
    SupportPickerModule
  ]
})
export class UserPendingModule {}
