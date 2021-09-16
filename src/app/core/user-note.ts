import * as dayjs from 'dayjs';
import { UserInfo } from './user-info';
import { USER_NOTE_TYPE } from './user-note-type';
import { UserSupport } from './user-support';

export class UserNote {
  contents: string[];
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
    this.getContent(data);
  }

  getContent(data: any): void {
    if (data.type === 'support_pending') {
      this.contents = data.supportDetail;
    } else if (data.type === 'support_delivering') {
      this.content = 'supportStatus.delivering';
    } else if (data.type === 'support_delivered') {
      this.content = 'supportStatus.delivered';
    } else if (data.type === 'support_failed') {
      this.contents = this.buildContent(data.content);
    } else {
      this.contents = this.buildContent(data.content);
    }
  }

  buildContent(data: string): string[] {
    return data.split(/\n/);
  }
}
