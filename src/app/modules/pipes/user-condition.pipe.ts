import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UserConditionType } from 'src/app/core/user-condition.enum';

@Pipe({
  name: 'userCondition'
})
export class userConditionPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: number, ...args: unknown[]): string {
    if (value === UserConditionType.Processing) {
      return this.translate.instant('userCondition.processing');
    } else if (value === UserConditionType.Recovered) {
      return this.translate.instant('userCondition.recovered');
    } else if (value === UserConditionType.Hospitalized) {
      return this.translate.instant('userCondition.hospitalized');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
