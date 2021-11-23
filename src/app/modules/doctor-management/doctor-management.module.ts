import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { PatientChipModule } from '../patient-chip/patient-chip.module';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { DoctorEditComponent } from './doctor-edit/doctor-edit.component';
import { DoctorManagementRoutingModule } from './doctor-management-routing.module';
import { DoctorManagementComponent } from './doctor-management.component';

@NgModule({
  declarations: [DoctorManagementComponent, DoctorEditComponent],
  imports: [
    CommonModule,
    DoctorManagementRoutingModule,
    SharedModule,
    TranslateModule.forChild({}),
    PipeModule,
    ReactiveFormsModule,
    PatientChipModule,
    OverlayModule
  ]
})
export class DoctorManagementModule {}
