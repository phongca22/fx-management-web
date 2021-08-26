import * as dayjs from 'dayjs';
import { Role } from './role';

export class UserNote {
  content: string;
  time: string;
  date: string;
  author: string;
  role: Role

  constructor(data: any) {
    this.content = data.content;
    this.time = dayjs(data.createdAt).format('HH:mm');
    this.date = dayjs(data.createdAt).format('DD-MM-YYYY');
    this.author = data.author.fullname;
    this.role = data.author.roles[0].id;
  }
}
