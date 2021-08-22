import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupportPickerComponent } from './support-picker.component';
import { SharedModule } from '../shared-module';
import { TranslateModule } from '@ngx-translate/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SupportPickerComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule],
  exports: [SupportPickerComponent]
})
export class SupportPickerModule {}
