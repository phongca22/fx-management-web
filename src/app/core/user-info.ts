import { reject, sortBy } from 'lodash';
import { Doctor } from './doctor';
import { User } from './user';
import { UserConditionType } from './user-condition.enum';
import { UserSupport } from './user-support';

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
  members: User[];
  agent: User;

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
    this.setCondition(data.condition);

    if (data.doctorAssignments) {
      this.setAssignment(data.doctorAssignments);
    }

    this.setMembers(data.members);
    this.setAgent(data.agent);
    this.addressLabel = this.combineAddress();
  }

  combineAddress() {
    return reject([this.address, this.ward ? 'P' + this.ward : null, this.district, this.province], [null]).join(', ');
  }

  setAssignment([data]: any[]) {
    this.doctor = new Doctor(data.doctor);
    this.doctorAssignmentId = data.id;
  }

  setMembers(data: any[]) {
    if (data) {
      this.members = data.map((val: any) => new User(val));
    }
  }

  setAgent(data: any) {
    if (data) {
      this.agent = new User(data);
      this.address = data.address;
      this.ward = data.ward;
      this.district = data.district;
      this.province = data.province;
      this.phone = data.phone;
      this.addressLabel = this.combineAddress();
    }
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
    this.setMembers(data.members);
    this.setAgent(data.agent);
  }

  addMember(data: User): void {
    this.members = this.members || [];
    this.members.push(data);
  }
}
