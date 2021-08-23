import { reject } from 'lodash';
import { Support } from './support';
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
  doctorId: number;
  supports: Support[];
  doctorAssignmentId: number;
  patientConditionId: any;

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
    if (data.condition) {
      this.setCondition(data.condition);
    }

    if (data.doctorAssignments) {
      this.setAssignment(data.doctorAssignments);
    }

    this.supports = data.supports;
    this.addressLabel = this.combineAddress();
  }

  combineAddress() {
    return reject([this.address, this.ward ? 'P' + this.ward : null, this.district, this.province], [null]).join(', ');
  }

  setAssignment([data]: any[]) {
    this.doctorId = data.doctorId;
    this.doctorAssignmentId = data.id;
  }

  setCondition(data: any) {
    this.condition = data.conditionId;
    this.patientConditionId = data.id;
  }

  setInfo(data: any) {
    this.setAssignment(data.doctorAssignments);
    this.setCondition(data.condition);
    this.supports = data.supports;
  }
}
