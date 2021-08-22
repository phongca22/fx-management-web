import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { SupportPickerModule } from '../support-picker/support-picker.module';
import { UserInfoModule } from '../user-info/user-info.module';
import { UserNoteModule } from '../user-note/user-note.module';
import { UserStatusPickerModule } from '../user-status-picker/user-status-picker.module';
import { UserPendingRoutingModule } from './user-processing-routing.module';
import { UserProcessingComponent } from './user-processing.component';

@NgModule({
  declarations: [UserProcessingComponent],
  imports: [
    CommonModule,
    UserPendingRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    UserInfoModule,
    SupportPickerModule,
    UserNoteModule,
    ClipboardModule,
    UserStatusPickerModule
  ]
})
export class UserPendingModule {}
