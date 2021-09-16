import { NgModule } from '@angular/core';
import { AgePipe } from './age.pipe';
import { GenderPipe } from './gender.pipe';
import { RolePipe } from './role.pipe';
import { SupportStatusPipe } from './support-status.pipe';
import { TestCovidPipe } from './test-covid.pipe';
import { PatientStatusPipe } from './patient-status.pipe';
import { YesNoPipe } from './yes-no.pipe';

@NgModule({
  declarations: [GenderPipe, PatientStatusPipe, SupportStatusPipe, AgePipe, RolePipe, TestCovidPipe, YesNoPipe],
  exports: [GenderPipe, PatientStatusPipe, SupportStatusPipe, AgePipe, RolePipe, TestCovidPipe, YesNoPipe]
})
export class PipeModule {}
