import { Pipe, PipeTransform } from '@angular/core';
import { isEqual } from 'lodash';
import { Role } from 'src/app/core/role';

@Pipe({
  name: 'role'
})
export class RolePipe implements PipeTransform {
  transform(value: Role | undefined, ...args: unknown[]): string {
    if (isEqual(Role.Admin, value)) {
      return 'role.admin';
    } else if (isEqual(Role.Doctor, value)) {
      return 'role.doctor';
    } else if (isEqual(Role.Agent, value)) {
      return 'role.agent';
    } else if (isEqual(Role.Volunteer, value)) {
      return 'role.volunteer';
    } else {
      return 'unknown';
    }
  }
}
