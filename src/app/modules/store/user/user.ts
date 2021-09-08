import { Role } from 'src/app/core/role';

export class User {
  id: number;
  roles: Role[];
  name: string;
  rooms: string[];

  constructor(data: any) {
    this.id = data.id;
    this.roles = data.roles;
    this.name = data.fullname;
    this.rooms = data.rooms;
  }
}
