import * as dayjs from 'dayjs';
import { find } from 'lodash';
import { Support } from './support';
import { SupportStatus } from './support-status';
import { User } from './user';

export class UserSupport {
  id: number;
  reason: string;
  status: SupportStatus;
  support: Support;
  date: Date;
  amount: number;
  transporter: User;
  deliveringDate: Date;
  deliveredDate: Date;
  dateLabel: string;
  revoke: boolean;
  revokedDate: Date;
  collectorName: string;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.status = data.status;
    this.amount = data.amount;
    this.revoke = data.revoke;
    this.date = new Date(data.createdAt);
    this.dateLabel = dayjs(data.createdAt).format('DD-MM-YYYY');
    if (data.transporter) {
      this.transporter = new User(data.transporter);
    }

    if (data.deliveringDate) {
      this.deliveringDate = new Date(data.deliveringDate);
    }

    if (data.deliveredDate) {
      this.deliveredDate = new Date(data.deliveredDate);
    }

    if (data.collector) {
      this.collectorName = data.collector.fullname;
    }

    if (data.revokedDate) {
      this.deliveredDate = new Date(data.deliveredDate);
    }

    this.support = new Support(data.support);
  }
}
