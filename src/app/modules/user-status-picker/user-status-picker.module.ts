import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { UserStatusPickerComponent } from './user-status-picker.component';

@NgModule({
  declarations: [UserStatusPickerComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule, PipeModule],
  exports: [UserStatusPickerComponent]
})
export class UserStatusPickerModule {}
