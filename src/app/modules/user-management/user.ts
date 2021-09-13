import { General } from 'src/app/core/general';
import { UserInfo } from 'src/app/core/user-info';


export class User extends UserInfo {
  username: string;
  roles: General[];

  constructor(data: any) {
    super(data);
    this.roles = data.roles.map((val: any) => new General(val));
    this.username = data.username;
  }
}
