import * as dayjs from 'dayjs';

export class UserNote {
  id: number;
  content: string;
  time: string;
  date: string;

  constructor(data: any) {
    this.id = data.id;
    this.content = data.content;
    this.time = dayjs(data.createdAt).format('HH:mm:ss');
    this.date = dayjs(data.createdAt).format('DD-MM-YYYY');
  }
}
