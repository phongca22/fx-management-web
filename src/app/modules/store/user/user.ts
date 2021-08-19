export class User {
  id: number;
  roles: string[];
  token: string;
  account: string;

  constructor(data: any) {
    this.id = data.id;
    this.account = data.username;
    this.token = data.accessToken;
    this.roles = data.roles;
  }
}
