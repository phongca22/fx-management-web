import { reject, find, isNil } from 'lodash';
import { Agent } from './agent';
import { Doctor } from './doctor';
import { SupportStatus } from './support-status';
import { PatientStatusType } from './user-condition.enum';

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
  status: PatientStatusType;
  code: string;
  doctor: Doctor;
  emergency: boolean;
  legacyCode: string;
  createdDate: Date;
  creator: Agent;

  constructor(data: any) {
    const { info, id, doctorAssignment, creator } = data;
    this.id = id;
    this.name = info.fullname;
    this.phone = info.phone;
    this.age = info.age;
    this.gender = info.gender;
    this.address = info.address;
    this.ward = info.ward;
    this.district = info.district;
    this.province = info.province;
    this.code = info.code;
    this.legacyCode = info.legacyCode;
    this.emergency = !isNil(find(doctorAssignment?.supports, { emergency: true, status: SupportStatus.Pending }));
    this.createdDate = new Date(data.createdAt);
    if (doctorAssignment) {
      this.setDoctor(doctorAssignment);
    }

    if (creator) {
      this.creator = new Agent(creator);
    }

    this.combineAddress();
  }

  combineAddress() {
    this.addressLabel = reject(
      [
        this.address,
        this.ward ? 'Phường ' + this.ward : null,
        this.district ? 'Quận ' + this.district : null,
        this.province
      ],
      [null]
    ).join(', ');
  }

  setDoctor(data: any) {
    if (data.doctor) {
      this.doctor = new Doctor(data.doctor);
    }
    
    this.status = data.status;
  }

  setInfo(data: UserInfo): void {
    this.name = data.name;
    this.gender = data.gender;
    this.phone = data.phone;
    this.age = data.age;
    this.province = data.province;
    this.district = data.district;
    this.ward = data.ward;
    this.address = data.address;
    this.combineAddress();
  }
}
