import * as dayjs from 'dayjs';
import { Role } from './role';
import { User } from './user';
import { USER_NOTE_TYPE } from './user-note-type';
import { UserSupport } from './user-support';

export class UserNote {
  content: string;
  time: string;
  date: string;
  author: User;
  role: Role;
  supportDetail: UserSupport;
  type: USER_NOTE_TYPE;
  patientSupport: UserSupport;

  constructor(data: any) {
    this.time = dayjs(data.createdAt).format('HH:mm');
    this.date = dayjs(data.createdAt).format('DD-MM-YYYY');
    this.role = data.author.roles[0].id;
    this.author = new User(data.author);
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
      this.content = 'supportStatus.failed';
    } else {
      this.content = data.content;
    }

    // if (this.author.role.id === Role.Doctor) {
    //   this.content = `<div>${data.details
    //     .map((val: any) => {
    //       return `<div class="mat-subheading-2 mb-0">${val.support.name} x${val.amount}</div>`;
    //     })
    //     .join('')}</div>`;
    // } else if (this.author.role.id === Role.Volunteer) {
    //   if (isEqual(this.supportDetail.status, SupportStatus.Delivering)) {
    //     this.content = 'supportStatus.delivering';
    //   } else if (isEqual(this.supportDetail.status, SupportStatus.Delivered)) {
    //     this.content = 'supportStatus.delivered';
    //   }
    // }
  }
}
