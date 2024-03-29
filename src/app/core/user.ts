export class User {
  id: number;
  name: string;
  roles: { id: number; name: string }[];
  account: string;
  gender: number;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.fullname;
    this.account = data.username;
    this.roles = data.roles;
    this.gender = data.gender;
  }
}
