import * as dayjs from 'dayjs';
import { find } from 'lodash';
import { Support } from './support';
import { SupportStatus } from './support-status';

export class UserSupport {
  id: number;
  reason: string;
  status: SupportStatus;
  support: Support;
  date: string;
  amount: number;
  time: string;
  transporterName: string;
  deliveringDate: Date;
  deliveredDate: Date;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.status = data.status;
    this.amount = data.amount;
    this.time = dayjs(data.createdAt).format('HH:mm');
    this.date = dayjs(data.createdAt).format('DD-MM-YYYY');
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
