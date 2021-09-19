import { UserInfo } from './user-info';

export class Agent {
  info: UserInfo;

  constructor(data: any) {
    this.info = new UserInfo(data);
  }
}
