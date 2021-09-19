import * as dayjs from 'dayjs';
import { UserInfo } from './user-info';
import { PATIENT_NOTE_TYPE } from './patient-note-type';
import { UserSupport } from './user-support';
import { isEqual } from 'lodash';

export class UserNote {
  contents: string[];
  content: string;
  time: string;
  date: string;
  author: UserInfo;
  supportDetail: UserSupport;
  type: PATIENT_NOTE_TYPE;
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
    if (isEqual(data.type, PATIENT_NOTE_TYPE.SUPPORT_PENDING)) {
      this.contents = data.supportDetail;
    } else if (isEqual(data.type, PATIENT_NOTE_TYPE.SUPPORT_DELIVERING)) {
      this.content = 'supportStatus.delivering';
    } else if (isEqual(data.type, PATIENT_NOTE_TYPE.SUPPORT_DELIVERED)) {
      this.content = 'supportStatus.delivered';
    } else if (isEqual(data.type, PATIENT_NOTE_TYPE.SUPPORT_FAILED)) {
      this.contents = this.buildContent(data.content);
    } else if (isEqual(data.type, PATIENT_NOTE_TYPE.PATIENT_STATUS_CHANGE)) {
      this.contents = data.content.split(',');
    } else if (isEqual(data.type, PATIENT_NOTE_TYPE.DOCTOR_CHANGE)) {
      this.contents = data.content.split(',');
    } else {
      this.contents = this.buildContent(data.content);
    }
  }

  buildContent(data: string): string[] {
    return data.split(/\n/);
  }
}
