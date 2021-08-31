import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SupportStatus } from 'src/app/core/support-status';

@Pipe({
  name: 'supportStatus'
})
export class SupportStatusPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: SupportStatus, ...args: unknown[]): string {
    return this.translate.instant(this.getKey(value));
  }

  getKey(value: SupportStatus): string {
    if (value === SupportStatus.Pending) {
      return 'supportStatus.pending';
    } else if (value === SupportStatus.Accepted) {
      return 'supportStatus.accepted'
    } else if (value === SupportStatus.Delivering) {
      return 'supportStatus.delivering';
    } else if (value === SupportStatus.Delivered) {
      return 'supportStatus.delivered';
    } else if (value === SupportStatus.Failed) {
      return 'supportStatus.failed';
    } else {
      return 'unknown';
    }
  }
}
