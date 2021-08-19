import { Role } from 'src/app/core/role';

export class User {
  id: number;
  roles: Role[];

  constructor(data: any) {
    this.id = data.id;
    this.roles = data.roles;
  }
}
