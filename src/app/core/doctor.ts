import { isNil } from 'lodash';
import { User } from './user';

export class Doctor extends User {
  active: boolean;
  count: number;

  constructor(data: any) {
    super(data);
    this.count = parseInt(data.count);
    this.active = !isNil(data.activeDoctor);
  }
}
