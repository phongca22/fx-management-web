import { Pipe, PipeTransform } from '@angular/core';
import { UserConditionType } from 'src/app/core/user-condition.enum';

@Pipe({
  name: 'userCondition'
})
export class userConditionPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value === UserConditionType.Processing) {
      return 'userCondition.processing';
    } else if (value === UserConditionType.Recovered) {
      return 'userCondition.recovered';
    } else if (value === UserConditionType.Hospitalized) {
      return 'userCondition.hospitalized';
    } else {
      return 'unknown';
    }
  }
}
