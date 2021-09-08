import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared-module';
import { DoctorManagementRoutingModule } from './doctor-management-routing.module';
import { DoctorManagementComponent } from './doctor-management.component';

@NgModule({
  declarations: [DoctorManagementComponent],
  imports: [CommonModule, DoctorManagementRoutingModule, SharedModule, TranslateModule.forChild({})]
})
export class DoctorManagementModule {}
