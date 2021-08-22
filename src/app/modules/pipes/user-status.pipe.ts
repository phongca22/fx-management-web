import { Pipe, PipeTransform } from '@angular/core';
import { UserStatus } from 'src/app/core/user-status.enum';

@Pipe({
  name: 'userStatus'
})
export class UserStatusPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (value === UserStatus.Pending) {
      return 'userStatus.waiting';
    } else if (value === UserStatus.Accepted) {
      return 'userStatus.accepted';
    } else if (value === UserStatus.Success) {
      return 'userStatus.success';
    } else {
      return 'userStatus.failed';
    }
  }
}
