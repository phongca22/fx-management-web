import * as dayjs from 'dayjs';
import { Support } from './support';
import { SupportStatus } from './support-status';

export class UserSupport {
  id: number;
  reason: string;
  status: SupportStatus;
  transporterName: string;
  support: Support;
  transportedDate: string;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.status = data.status;
    this.support = new Support(data.support);
    if (data.transporter) {
      this.transporterName = data.transporter.fullname;
    } else {
      this.transporterName = 'userSupportDetail.pending';
    }
    this.transportedDate = dayjs(new Date(data.updatedAt)).format('HH:mm:ss DD-MM-YYYY');
  }
}
