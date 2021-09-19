import { find, isNil } from 'lodash';
import { DoctorLevelType } from './doctor-level.enum';
import { UserInfo } from './user-info';

export class Doctor {
  info: UserInfo;
  active: boolean;
  count: number;
  level: DoctorLevelType;

  constructor(data: any) {
    this.info = new UserInfo(data);
    this.count = parseInt(data.count);
    this.active = !isNil(data.activeDoctor);
    this.level = data.doctorInfo?.level;
  }

  public static parseActive({ summary, data }: any): Doctor[] {
    return data.map((val: any) => {
      return new Doctor({
        count: find(summary, { doctor: { id: val.id } })?.count || 0,
        ...val
      });
    });
  }
}
