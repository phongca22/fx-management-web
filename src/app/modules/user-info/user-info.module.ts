import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DoctorPickerModule } from '../doctor-picker/doctor-picker.module';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { UserStatusPickerModule } from '../user-condition-picker/user-condition-picker.module';
import { UserEditModule } from '../user-edit/user-edit.module';
import { UserNoteModule } from '../user-note/user-note.module';
import { UserSupportModule } from '../user-support/user-support.module';
import { UserInfoComponent } from './user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild({}),
    PipeModule,
    UserEditModule,
    UserNoteModule,
    ClipboardModule,
    UserStatusPickerModule,
    DoctorPickerModule,
    UserSupportModule
  ],
  exports: [UserInfoComponent]
})
export class UserInfoModule {}
