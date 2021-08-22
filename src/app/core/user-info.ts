import { reject } from 'lodash';
import { UserStatus } from './user-status.enum';

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
  status: UserStatus;
  code: string;
  doctorId: number;
  supports: any[]

  constructor(data: any) {
    this.id = data.id;
    this.name = data.fullname;
    this.phone = data.phone;
    this.age = data.age;
    this.gender = data.gender;
    this.address = data.address;
    this.ward = data.ward;
    this.district = data.district;
    this.province = data.province;
    this.status = data.status;
    this.code = data.code;
    this.doctorId = data.doctorId;
    this.supports = data.supports;
    this.addressLabel = this.combineAddress();
  }

  combineAddress() {
    return reject([this.address, this.ward ? 'P' + this.ward : null, this.district, this.province], [null]).join(', ');
  }
}
