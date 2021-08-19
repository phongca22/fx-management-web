import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertComponent } from './alert.component';
import { SharedModule } from '../shared-module';

@NgModule({
  declarations: [AlertComponent],
  imports: [CommonModule, SharedModule],
  exports: [AlertComponent]
})
export class AlertModule {}
