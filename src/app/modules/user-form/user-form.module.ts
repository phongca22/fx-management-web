import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { UserFormComponent } from './user-form.component';

@NgModule({
  declarations: [UserFormComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule],
  exports: [UserFormComponent]
})
export class UserFormModule {}
