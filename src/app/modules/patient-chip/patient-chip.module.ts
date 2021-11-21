import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeModule } from '../pipes/pipe.module';
import { SharedModule } from '../shared-module';
import { CovidLevelChipComponent } from './covid-level-chip/covid-level-chip.component';
import { PatientStatusChipComponent } from './patient-status-chip/patient-status-chip.component';

@NgModule({
  declarations: [PatientStatusChipComponent, CovidLevelChipComponent],
  imports: [CommonModule, SharedModule, PipeModule],
  exports: [PatientStatusChipComponent, CovidLevelChipComponent]
})
export class PatientChipModule {}
