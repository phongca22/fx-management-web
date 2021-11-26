import { isNil } from 'lodash';
import { UserInfo } from 'src/app/core/user-info';

export class UserProfile {
  info: UserInfo;
  roles: string[];
  workToday: boolean;

  constructor(data: any) {
    this.info = new UserInfo(data);
    this.roles = data.roles.map(({ name }: any) => name);
    this.workToday = !isNil(data.activeDoctor);
  }
}
