import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { TransporterPickerModule } from '../transporter-picker/transporter-picker.module';
import { AddSupportComponent } from './add-support/add-support.component';
import { SupportStatusUpdateComponent } from './support-status-update/support-status-update.component';
import { UserSupportComponent } from './user-support.component';

@NgModule({
  declarations: [UserSupportComponent, AddSupportComponent, SupportStatusUpdateComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    PipeModule,
    TransporterPickerModule
  ],
  exports: [AddSupportComponent, UserSupportComponent]
})
export class UserSupportModule {}
