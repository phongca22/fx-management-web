import { reject } from 'lodash';
import { Doctor } from './doctor';
import { General } from './general';
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
  members: General[];
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
    this.addressLabel = this.combineAddress();
    if (data.doctorAssignments) {
      this.setAssignment(data.doctorAssignments);
    }
  }

  combineAddress() {
    return reject(
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

  setInfo(data: any) {
    this.setAssignment(data.doctorAssignments);
    this.setCondition(data.condition);
  }
}
