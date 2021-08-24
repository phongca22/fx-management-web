import { Pipe, PipeTransform } from '@angular/core';
import { SupportStatus } from 'src/app/core/support-status';

@Pipe({
  name: 'supportStatus'
})
export class SupportStatusPipe implements PipeTransform {
  transform(value: SupportStatus, ...args: unknown[]): string {
    if (value === SupportStatus.Pending) {
      return 'supportStatus.pending';
    } else if (value === SupportStatus.Delivering) {
      return 'supportStatus.delivering';
    } else if (value === SupportStatus.Delivered) {
      return 'supportStatus.delivered';
    } else if (value === SupportStatus.Failed) {
      return 'supportStatus.failed';
    } else {
      return 'supportStatus.unknown';
    }
  }
}
