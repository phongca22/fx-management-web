import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { UserSupportDetailComponent } from './user-support-detail/user-support-detail.component';
import { UserSupportEditComponent } from './user-support-edit/user-support-edit.component';

@NgModule({
  declarations: [UserSupportEditComponent, UserSupportDetailComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), ReactiveFormsModule, PipeModule],
  exports: [UserSupportEditComponent, UserSupportDetailComponent]
})
export class UserSupportModule {}
