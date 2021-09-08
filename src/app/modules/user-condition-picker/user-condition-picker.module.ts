import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { UserConditionPickerComponent } from './user-condition-picker.component';

@NgModule({
  declarations: [UserConditionPickerComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule, PipeModule]
})
export class UserStatusPickerModule {}
