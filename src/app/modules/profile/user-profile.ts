import { UserInfo } from 'src/app/core/user-info';

export class UserProfile {
  info: UserInfo;
  roles: string[];

  constructor(data: any) {
    this.info = new UserInfo(data);
    this.roles = data.roles.map(({ name }: any) => name);
  }
}
