import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { TransporterPickerComponent } from './transporter-picker.component';

@NgModule({
  declarations: [TransporterPickerComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule.forChild({})],
  exports: [TransporterPickerComponent]
})
export class TransporterPickerModule {}
