import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { PatientStatusType } from 'src/app/core/user-condition.enum';

@Component({
  selector: 'app-patient-status-chip',
  templateUrl: './patient-status-chip.component.html',
  styleUrls: ['./patient-status-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PatientStatusChipComponent implements OnInit {
  @Input() data: PatientStatusType;

  constructor() {}

  ngOnInit(): void {}

  isProcessing(): boolean {
    return isEqual(PatientStatusType.Processing, this.data);
  }

  isPending(): boolean {
    return isEqual(PatientStatusType.Pending, this.data);
  }

  isDone(): boolean {
    return isEqual(PatientStatusType.Done, this.data);
  }

  isRecovered(): boolean {
    return isEqual(PatientStatusType.Recovered, this.data);
  }

  isHospitalized(): boolean {
    return isEqual(PatientStatusType.Hospitalized, this.data);
  }
}
