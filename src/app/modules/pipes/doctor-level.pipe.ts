import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { DoctorLevelType } from 'src/app/core/doctor-level.enum';

@Pipe({
  name: 'doctorLevel'
})
export class DoctorLevelPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: DoctorLevelType | undefined, ...args: unknown[]): string {
    if (isEqual(value, DoctorLevelType.Level_1)) {
      return this.translate.instant('doctorLevel.level1');
    } else if (isEqual(value, DoctorLevelType.Level_2)) {
      return this.translate.instant('doctorLevel.level2');
    } else if (isEqual(value, DoctorLevelType.Level_3)) {
      return this.translate.instant('doctorLevel.level3');
    } else if (isEqual(value, DoctorLevelType.Level_4)) {
      return this.translate.instant('doctorLevel.level4');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
