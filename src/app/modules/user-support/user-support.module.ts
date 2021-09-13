import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { TransporterPickerModule } from '../transporter-picker/transporter-picker.module';
import { AddSupportComponent } from './add-support/add-support.component';
import { CreateSupportComponent } from './create-support/create-support.component';
import { SupportStatusUpdateComponent } from './support-status-update/support-status-update.component';

@NgModule({
  declarations: [AddSupportComponent, SupportStatusUpdateComponent, CreateSupportComponent],
  imports: [
    CommonModule,
    SharedModule,
    TranslateModule.forChild({}),
    ReactiveFormsModule,
    PipeModule,
    TransporterPickerModule
  ]
})
export class UserSupportModule {}
