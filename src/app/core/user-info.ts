import { reject, find, isNil } from 'lodash';
import { Doctor } from './doctor';
import { SupportStatus } from './support-status';
import { UserConditionType } from './user-condition.enum';

export class UserInfo {
  id: number;
  name: string;
  phone: string;
  age: number;
  gender: number;
  address: string;
  ward: string | null;
  district: string;
  province: string;
  addressLabel: string;
  condition: UserConditionType;
  code: string;
  doctor: Doctor;
  member: number;
  emergency: boolean;
  legacyCode: string;

  constructor(data: any) {
    const { info, id, doctorAssignment } = data;
    this.id = id;
    this.name = info.fullname;
    this.phone = info.phone;
    this.age = info.age;
    this.gender = info.gender;
    this.address = info.address;
    this.ward = info.ward;
    this.district = info.district;
    this.province = info.province;
    this.condition = info.status;
    this.code = info.code;
    this.member = info.member;
    this.legacyCode = info.legacyCode;
    this.emergency = !isNil(find(doctorAssignment?.supports, { emergency: true, status: SupportStatus.Pending }));
    if (data.condition) {
      this.setCondition(data.condition);
    }
    if (data.doctor) {
      this.setDoctor(data.doctor);
    }
    this.combineAddress();
  }

  combineAddress() {
    this.addressLabel = reject(
      [this.address, this.ward ? 'Phường ' + this.ward : null, this.district ? 'Quận ' + this.district : null, this.province],
      [null]
    ).join(', ');
  }

  setDoctor(data: any) {
    this.doctor = new Doctor(data);
  }

  setCondition({ status }: any) {
    this.condition = status;
  }

  setInfo(data: UserInfo): void {
    this.name = data.name;
    this.gender = data.gender;
    this.member = data.member;
    this.phone = data.phone;
    this.age = data.age;
    this.province = data.province;
    this.district = data.district;
    this.ward = data.ward;
    this.address = data.address;
    this.combineAddress();
  }
}
