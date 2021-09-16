import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'yesNo'
})
export class YesNoPipe implements PipeTransform {
  constructor(private translate: TranslateService) {}

  transform(value: boolean | undefined, ...args: unknown[]): string {
    if (value === true) {
      return this.translate.instant('yes');
    } else if (value === false) {
      return this.translate.instant('no');
    } else {
      return this.translate.instant('unknown');
    }
  }
}
