import { UserInfo } from './user-info';

export class Agent {
  info: UserInfo;
  active: boolean;
  account: string;

  constructor(data: any) {
    this.info = new UserInfo(data);
    this.account = data.username;
    this.active = data.active;
  }
}
