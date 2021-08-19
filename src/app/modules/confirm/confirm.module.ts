import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { ConfirmComponent } from './confirm.component';

@NgModule({
  declarations: [ConfirmComponent],
  imports: [CommonModule, SharedModule, TranslateModule.forChild({})],
  exports: [ConfirmComponent]
})
export class ConfirmModule {}
