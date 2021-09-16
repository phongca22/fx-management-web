import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { DoctorPickerModule } from '../doctor-picker/doctor-picker.module';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { PatientStatusPickerModule } from '../patient-status-picker/patient-status-picker.module';
import { UserEditModule } from '../user-edit/user-edit.module';
import { UserNoteModule } from '../user-note/user-note.module';
import { UserSupportModule } from '../user-support/user-support.module';
import { UserCardComponent } from './user-card/user-card.component';
import { UserInfoComponent } from './user-info.component';

@NgModule({
  declarations: [UserInfoComponent, UserCardComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild({}),
    PipeModule,
    UserEditModule,
    UserNoteModule,
    ClipboardModule,
    PatientStatusPickerModule,
    DoctorPickerModule,
    UserSupportModule
  ],
  exports: [UserCardComponent]
})
export class UserInfoModule {}
