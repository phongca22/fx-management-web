import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditComponent } from './user-edit.component';
import { SharedModule } from '../shared-module';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { UserFormModule } from '../user-form/user-form.module';

@NgModule({
  declarations: [UserEditComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, TranslateModule.forChild({}), UserFormModule],
  exports: [UserEditComponent]
})
export class UserEditModule {}
