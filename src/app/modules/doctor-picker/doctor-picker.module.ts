import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { DoctorPickerComponent } from './doctor-picker.component';

@NgModule({
  declarations: [DoctorPickerComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule.forChild({})],
  exports: [DoctorPickerComponent]
})
export class DoctorPickerModule {}
