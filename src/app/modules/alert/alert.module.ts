import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { SharedModule } from '../shared-module';
import { ConfirmModule } from '../confirm/confirm.module';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, SharedModule, ConfirmModule],
  exports: [AlertComponent]
})
export class AlertModule {}
