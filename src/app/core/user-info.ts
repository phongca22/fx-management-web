import { reject } from 'lodash';
import { Doctor } from './doctor';
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
  doctorAssignmentId: number;
  patientConditionId: any;
  member: number;

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
    this.condition = data.status;
    this.code = data.code;
    this.member = data.member;
    this.setCondition(data.condition);
    this.combineAddress();
    if (data.doctorAssignments) {
      this.setAssignment(data.doctorAssignments);
    }
  }

  combineAddress() {
    this.addressLabel = reject(
      [this.address, this.ward ? 'P.' + this.ward : null, this.district ? 'Q.' + this.district : null, this.province],
      [null]
    ).join(', ');
  }

  setAssignment([data]: any[]) {
    this.doctor = new Doctor(data.doctor);
    this.doctorAssignmentId = data.id;
  }

  setCondition(data: any) {
    if (data) {
      this.condition = data.conditionId;
      this.patientConditionId = data.id;
    }
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
