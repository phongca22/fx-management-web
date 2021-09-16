import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { PatientStatusType } from 'src/app/core/user-condition.enum';

@Pipe({
  name: 'patientStatus'
})
export class PatientStatusPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: PatientStatusType | undefined, ...args: unknown[]): string {
    if (isEqual(value, PatientStatusType.Pending)) {
      return this.translate.instant('patientStatus.pending');
    } else if (isEqual(value, PatientStatusType.Processing)) {
      return this.translate.instant('patientStatus.processing');
    } else if (isEqual(value, PatientStatusType.Recovered)) {
      return this.translate.instant('patientStatus.recovered');
    } else if (isEqual(value, PatientStatusType.Hospitalized)) {
      return this.translate.instant('patientStatus.hospitalized');
    } else if (isEqual(value, PatientStatusType.Done)) {
      return this.translate.instant('patientStatus.done');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
