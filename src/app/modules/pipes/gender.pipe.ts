import { Pipe, PipeTransform } from '@angular/core';
import { isNil } from 'lodash';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {
  transform(value: unknown, ...args: unknown[]): string {
    if (isNil(value)) {
      return 'unknown';
    } else if (value === 0) {
      return 'gender.female';
    } else {
      return 'gender.male';
    }
  }
}
