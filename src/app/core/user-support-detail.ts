import { General } from './general';

export class UserSupportDetail {
  id: number;
  amount: number;
  support: General;

  constructor(data: any) {
    this.id = data.id;
    this.amount = data.amount;
    this.support = new General(data.support);
  }
}
