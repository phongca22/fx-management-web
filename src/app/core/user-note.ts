import * as dayjs from 'dayjs';
import { UserInfo } from './user-info';
import { USER_NOTE_TYPE } from './user-note-type';
import { UserSupport } from './user-support';

export class UserNote {
  content: string;
  time: string;
  date: string;
  author: UserInfo;
  supportDetail: UserSupport;
  type: USER_NOTE_TYPE;
  patientSupport: UserSupport;

  constructor(data: any) {
    this.time = dayjs(data.createdAt).format('HH:mm');
    this.date = dayjs(data.createdAt).format('DD-MM-YYYY');
    this.author = new UserInfo(data.author);
    this.type = data.type;
    if (data.patientSupport) {
      this.patientSupport = new UserSupport(data.patientSupport);
    }
    this.combineContent(data);
  }

  combineContent(data: any): void {
    if (data.type === 'support_pending') {
      this.content = `<div>${data.supportDetail
        .map((val: any) => {
          return `<div class="mat-subheading-2 mb-0">${val.support.name} x${val.amount}</div>`;
        })
        .join('')}</div>`;
    } else if (data.type === 'support_delivering') {
      this.content = 'supportStatus.delivering';
    } else if (data.type === 'support_delivered') {
      this.content = 'supportStatus.delivered';
    } else if (data.type === 'support_failed') {
      this.content = data.content;
    } else {
      this.content = data.content;
    }
  }
}
