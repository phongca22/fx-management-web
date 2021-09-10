import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isEqual } from 'lodash';
import { UserConditionType } from 'src/app/core/user-condition.enum';

@Pipe({
  name: 'userCondition'
})
export class userConditionPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: UserConditionType, ...args: unknown[]): string {
    if (isEqual(value, UserConditionType.Processing)) {
      return this.translate.instant('userCondition.processing');
    } else if (isEqual(value, UserConditionType.Recovered)) {
      return this.translate.instant('userCondition.recovered');
    } else if (isEqual(value, UserConditionType.Hospitalized)) {
      return this.translate.instant('userCondition.hospitalized');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
