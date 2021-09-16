import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { TestCovidType } from 'src/app/core/test-covid-type.enum';

@Pipe({
  name: 'testCovid'
})
export class TestCovidPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: TestCovidType | undefined, ...args: unknown[]): string {
    if (isEqual(value, TestCovidType.Ward)) {
      return this.translate.instant('testCovidType.ward');
    } else if (isEqual(value, TestCovidType.Kit)) {
      return this.translate.instant('testCovidType.kit');
    } else if (isEqual(value, TestCovidType.NoMoney)) {
      return this.translate.instant('testCovidType.noMoney');
    } else if (isEqual(value, TestCovidType.Suspect)) {
      return this.translate.instant('testCovidType.suspect');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
