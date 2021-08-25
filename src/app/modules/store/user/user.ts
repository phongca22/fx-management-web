import { Role } from 'src/app/core/role';

export class User {
  id: number;
  roles: Role[];
  role: Role | undefined;
  name: string;

  constructor(data: any) {
    this.id = data.id;
    this.roles = data.roles;
    this.role = this.roles ? this.roles[0] : undefined;
  }
}
