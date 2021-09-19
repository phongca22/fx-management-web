import { UserInfo } from './user-info';

export class Transporter {
  info: UserInfo;
  activeDistricts: string[];

  constructor(data: any) {
    this.info = new UserInfo(data);
    this.activeDistricts = data.info.activeDistrict.split(',');
  }
}
