import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'age'
})
export class AgePipe implements PipeTransform {
  constructor(private translate: TranslateService) {}
  transform(value: null | number, ...args: unknown[]): string {
    if (isNil(value)) {
      return this.translate.instant('unknown');
    } else {
      return value.toString();
    }
  }
}
