import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { TransporterPickerComponent } from './transporter-picker.component';
import { TransporterCreateComponent } from './transporter-create/transporter-create.component';
import { PipeModule } from '../pipes/pipe.module';

@NgModule({
  declarations: [TransporterPickerComponent, TransporterCreateComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule.forChild({}), PipeModule]
})
export class TransporterPickerModule {}
