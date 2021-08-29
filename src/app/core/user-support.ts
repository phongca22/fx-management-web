import * as dayjs from 'dayjs';
import { find } from 'lodash';
import { Support } from './support';
import { SupportStatus } from './support-status';

export class UserSupport {
  id: number;
  reason: string;
  status: SupportStatus;
  support: Support;
  date: Date;
  amount: number;
  transporterName: string;
  deliveringDate: Date;
  deliveredDate: Date;
  dateLabel: string;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.status = data.status;
    this.amount = data.amount;
    this.date = new Date(data.createdAt);
    this.dateLabel = dayjs(data.createdAt).format('DD-MM-YYYY');
    if (data.transporter) {
      this.transporterName = data.transporter.fullname;
    }

    if (data.deliveringDate) {
      this.deliveringDate = new Date(data.deliveringDate);
    }

    if (data.deliveredDate) {
      this.deliveredDate = new Date(data.deliveredDate);
    }

    this.support = new Support(data.support);
  }
}
