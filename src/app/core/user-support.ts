import { Support } from './support';
import { SupportStatus } from './support-status';
import { User } from './user';

export class UserSupport {
  id: number;
  reason: string;
  status: SupportStatus;
  details: Support[];
  date: Date;
  transporter: User;
  emergency: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.reason = data.reason;
    this.status = data.status;
    this.emergency = data.emergency;
    if (data.transporter) {
      this.transporter = new User(data.transporter);
    }
  }
}
