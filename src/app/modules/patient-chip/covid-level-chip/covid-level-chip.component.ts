import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { isEqual } from 'lodash';
import { DoctorLevelType } from 'src/app/core/doctor-level.enum';

@Component({
  selector: 'app-covid-level-chip',
  templateUrl: './covid-level-chip.component.html',
  styleUrls: ['./covid-level-chip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CovidLevelChipComponent implements OnInit {
  @Input() data: DoctorLevelType;

  constructor() {}

  ngOnInit(): void {}

  isLevel1(): boolean {
    return isEqual(DoctorLevelType.Level_1, this.data);
  }

  isLevel2(): boolean {
    return isEqual(DoctorLevelType.Level_2, this.data);
  }

  isLevel3(): boolean {
    return isEqual(DoctorLevelType.Level_3, this.data);
  }

  isLevel4(): boolean {
    return isEqual(DoctorLevelType.Level_4, this.data);
  }
}
