import { NgModule } from '@angular/core';
import { AgePipe } from './age.pipe';
import { DoctorLevelPipe } from './doctor-level.pipe';
import { GenderPipe } from './gender.pipe';
import { PatientStatusPipe } from './patient-status.pipe';
import { RolePipe } from './role.pipe';
import { SupportStatusPipe } from './support-status.pipe';
import { TestCovidPipe } from './test-covid.pipe';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
  declarations: [
    GenderPipe,
    PatientStatusPipe,
    SupportStatusPipe,
    AgePipe,
    RolePipe,
    TestCovidPipe,
    YesNoPipe,
    DoctorLevelPipe
  ],
  exports: [
    GenderPipe,
    PatientStatusPipe,
    SupportStatusPipe,
    AgePipe,
    RolePipe,
    TestCovidPipe,
    YesNoPipe,
    DoctorLevelPipe
  ]
})
export class PipeModule {}
