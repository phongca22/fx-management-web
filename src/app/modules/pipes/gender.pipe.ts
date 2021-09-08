import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: unknown, ...args: unknown[]): string {
    if (isNil(value)) {
      return this.translate.instant('unknown');
    } else if (value === 0) {
      return this.translate.instant('gender.female');
    } else {
      return this.translate.instant('gender.male');
    }
  }
}
