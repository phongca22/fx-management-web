import { Pipe, PipeTransform } from '@angular/core';
import { UserStatusType } from 'src/app/core/user-status.enum';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (value === UserStatusType.Processing) {
      return 'userStatus.processing';
    } else if (value === UserStatusType.Recovered) {
      return 'userStatus.recovered';
    } else {
      return 'userStatus.hospitalized';
    }
  }
}
