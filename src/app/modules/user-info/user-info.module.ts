import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { UserInfoComponent } from './user-info.component';

@NgModule({
  declarations: [UserInfoComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({}), PipeModule],
  exports: [UserInfoComponent]
})
export class UserInfoModule {}
