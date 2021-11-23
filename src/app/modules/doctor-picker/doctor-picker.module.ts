import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { DoctorPickerComponent } from './doctor-picker.component';

@NgModule({
  declarations: [DoctorPickerComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule.forChild({}), PipeModule],
  exports: [DoctorPickerComponent]
})
export class DoctorPickerModule {}
